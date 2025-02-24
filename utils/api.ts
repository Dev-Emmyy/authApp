import bcrypt from "bcryptjs";


export const fetchUsers = async () => {
  const res = await fetch("http://localhost:3001/users");
  return res.json();
};

export const createUser = async (email: string, password: string) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const res = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: hashedPassword }),
  });
  return res.json();
};