import numpy as np


class LogisticRegressionScratch:

    def __init__(self, learning_rate=0.001, epochs=1000):
        self.learning_rate = learning_rate
        self.epochs = epochs
        self.weights = None
        self.bias = None

    # Sigmoid function
    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))

    # Training
    def fit(self, X, y):

        n_samples, n_features = X.shape

        self.weights = np.zeros(n_features)
        self.bias = 0

        for epoch in range(self.epochs):

            # Linear equation
            z = np.dot(X, self.weights) + self.bias

            # Probability predictions
            y_pred = self.sigmoid(z)

            # Gradients
            dw = (1 / n_samples) * np.dot(X.T, (y_pred - y))
            db = (1 / n_samples) * np.sum(y_pred - y)

            # Update weights
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

            # Print loss every 100 epochs
            if epoch % 100 == 0:

                loss = -np.mean(
                    y * np.log(y_pred + 1e-8)
                    + (1 - y) * np.log(1 - y_pred + 1e-8)
                )

                print(f"Epoch {epoch}: Loss = {loss:.4f}")

    # Probability prediction
    def predict_proba(self, X):

        z = np.dot(X, self.weights) + self.bias

        return self.sigmoid(z)

    # Binary prediction
    def predict(self, X):

        probabilities = self.predict_proba(X)

        return (probabilities >= 0.5).astype(int)