"use server";

export async function loginAction(formData: FormData) {
  const id = formData.get("id");
  const password = formData.get("password");

  console.log(id, password);
}
