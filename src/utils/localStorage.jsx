export const saveUser = (user) => {
  localStorage.setItem("quiz-user", JSON.stringify(user));
};

export const getSavedUser = () => {
  const data = localStorage.getItem("quiz-user");
  return data ? JSON.parse(data) : null;
};

export const saveProgress = (data) => {
  localStorage.setItem("quiz-progress", JSON.stringify(data));
};

export const getProgress = () => {
  const data = localStorage.getItem("quiz-progress");
  return data ? JSON.parse(data) : null;
};

export const clearProgress = () => {
  localStorage.removeItem("quiz-progress");
};
