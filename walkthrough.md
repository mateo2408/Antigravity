# Walkthrough - User and Checkout Logic

I have implemented the logic for the User Profile and the Checkout process.

## Changes

### 1. User Profile Logic
- **User Button**: Now opens a modal when clicked.
- **Login State**: Initially shows a login form.
- **Profile State**: After clicking "Ingresar", shows a mock user profile with avatar, name, and stats.
- **Logout**: Allows switching back to the login state.
- **Files Modified**:
    - `index.html`: Added `id="userBtn"` and the User Modal structure.
    - `styles.css`: Added styles for the user modal (avatar, form, stats).
    - `script.js`: Added logic to handle modal opening, state toggling, and rendering.

### 2. Checkout Logic
- **Proceed to Pay Button**: Now functional.
- **Validation**: Checks if the cart is empty before proceeding.
- **Confirmation**: Asks the user to confirm the total amount.
- **Success**: Simulates a successful payment, clears the cart, and updates the UI.
- **Files Modified**:
    - `index.html`: Added `id="checkoutBtn"`.
    - `script.js`: Added event listener for the checkout button.

## Verification Results

### Manual Verification
- **User Flow**:
    1. Click User Icon -> Modal opens with Login Form.
    2. Click "Ingresar" -> Modal updates to show Profile (Mateo Cisneros).
    3. Click "Cerrar Sesión" -> Modal returns to Login Form.
    4. Click outside modal -> Modal closes.
- **Checkout Flow**:
    1. Click "Proceder al Pago" with empty cart -> Alert "Tu carrito está vacío".
    2. Add items to cart.
    3. Click "Proceder al Pago" -> Confirm dialog shows correct total.
    4. Click "OK" -> Success alert, cart clears, modal closes.
