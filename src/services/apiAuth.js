import { supabase, supabaseUrl } from "./supabase";

// Signup
const SignupApi = async function ({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error("Could not signup, try again");
  }
  return data;
};

// Login
const LoginApi = async function ({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Just to check if user loged in before if so no need to login again
const GetCurrentUser = async function () {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
};

// Logout
const LogoutApi = async function () {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

const updateCurrentUser = async function ({ password, fullName, avatar }) {
  let updateData;

  if (fullName) updateData = { data: { fullName } };

  if (password) updateData = { password };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  const fileName = `avatar-${
    data.user.id
  }-${Math.random()}-${avatar?.name?.replaceAll("/", "")}`;

  const storagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  const { data: updatedUser, error2 } = await supabase.auth.updateUser({
    data: {
      avatar: storagePath,
    },
  });

  if (error2) {
    throw new Error(error2.message);
  }
  return updatedUser;
};

export { LoginApi, GetCurrentUser, LogoutApi, SignupApi, updateCurrentUser };
