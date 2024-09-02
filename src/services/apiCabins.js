import { supabase, supabaseUrl } from "./supabase";

export const getCabins = async function () {
  try {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) throw new Error("Cabins could not be loaded");

    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteCabin = async function (id) {
  try {
    const { data, error } = await supabase
      .from("cabins")
      .delete()
      .eq("id", id)
      .select();

    if (error)
      throw new Error(
        "Cabin could not be delete, make sure there is no booking on this cabin befor deleting"
      );

    const { error: deleteError } = await supabase.storage
      .from("cabin-images")
      .remove([data[0].image.split("/").at(-1)]);

    if (deleteError) throw new Error("image could not be deleted");

    return data;
  } catch (err) {
    throw err;
  }
};

export const createEditCabin = async function ({
  data: newCabin,
  editId: id = false,
}) {
  try {
    const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin?.image[0]?.name}`.replaceAll(
      "/",
      ""
    );

    const imagePath = hasImagePath
      ? newCabin?.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // create / update
    let query = await supabase.from("cabins");

    // A) create
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) Update
    if (id)
      query = query
        .update({
          ...newCabin,
          image: imagePath,
        })
        .eq("id", id);

    const { data, error } = await query.select();

    if (error)
      throw new Error(`Cabin could not be ${id ? "updated" : "added"}`);

    if (hasImagePath) return;

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image[0]);

    if (storageError) {
      await deleteCabin(data[0].id);
      throw new Error(
        `Image and Cabin could not be ${id ? "updated" : "added"}`
      );
    }

    return data;
  } catch (err) {
    throw err;
  }
};
