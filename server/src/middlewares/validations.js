export const validateMainAccountData = async (req, res, next) => {
  const { name, adress, state, email, roles, password } = req.body;

  if (!name || !adress || !state || !email || !roles || !password)
    return res.status(400).json({ message: `Incomplete fields` });

  next();
};

export const validateEmployeAccountData = async (req, res, next) => {
  const { email, roles, password, name, lastname, dni } = req.body;

  if (!email || !roles || !password || !name || !lastname || !dni)
    return res.status(400).json({ message: `Incomplete fields` });

  next();
};

export const validateCategoryData = async (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: `Incomplete fields` });

  next();
};

export const validateProductData = async (req, res, next) => {
  const { name, description, price, category_id } = req.body;

  if (!name || !description || !price || !category_id)
    return res.status(400).json({ message: `Incomplete fields` });

  next();
};
