const AUTH_KEY = "authUser";
const USERS_KEY = "bike_users";

// ==================
// AUTH (CURRENT USER)
// ==================

// save user
export const setUser = (user) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

// get user
export const getUser = () => {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
};

// remove user
export const removeUser = () => {
  localStorage.removeItem(AUTH_KEY);
};

// ==================
// USERS DATABASE
// ==================

// get all users
export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

// save users
export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// register user
export const registerUser = (userData) => {
  const users = getUsers();

  const existingUser = users.find(
    (user) =>
      user.email.toLowerCase() === userData.email.toLowerCase()
  );

  if (existingUser) {
    return null;
  }

  const newUser = {
    id: Date.now().toString(), // ✅ FIX
    ...userData,
    phone: userData.phone.trim(), // ✅ clean
    role: userData.role || "customer",
  };

  users.push(newUser);
  saveUsers(users);

  return newUser;
};

// login user
export const loginUser = (email, password) => {
  const users = getUsers();

  return users.find(
    (user) => user.email === email && user.password === password
  );
};

export const updateUser = (updatedUser) => {
  const users = JSON.parse(localStorage.getItem("bike_users")) || [];

  const updatedUsers = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );

  localStorage.setItem("bike_users", JSON.stringify(updatedUsers));

  // 🔥 also update current logged user
  localStorage.setItem("authUser", JSON.stringify(updatedUser));

  return updatedUser;
};