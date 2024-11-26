import jwt from 'jsonwebtoken';

const requireSignIn = (req, res, next) => {
  try {
    // Get the token from the headers
    const token = req.headers.authorization?.split(' ')[1]; // Assuming "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key from environment variables
    req.user = decoded; // Attach the decoded user information to the request object

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default requireSignIn;


