/**
 * JSDoc type definitions for Karni Paridhan
 *
 * These are pure JSDoc comments — no runtime cost, no TypeScript compiler needed.
 * They provide IntelliSense / autocomplete in VS Code for all Supabase data shapes.
 */

/**
 * @typedef {Object} Profile
 * @property {string} id         - UUID matching auth.users.id
 * @property {string} email
 * @property {string|null} full_name
 * @property {'user'|'admin'} role
 * @property {string|null} avatar_url
 * @property {string} created_at - ISO timestamp
 * @property {string} updated_at - ISO timestamp
 */

/**
 * @typedef {Object} CartItem
 * Represents a single item in the cart (in memory or persisted to Supabase)
 * @property {string} id            - product id (e.g. "suit-1")
 * @property {string} name
 * @property {number} price
 * @property {number} originalPrice
 * @property {string} image         - URL of primary product image
 * @property {string} category
 * @property {string|null} selectedSize
 * @property {number} qty
 */

/**
 * @typedef {Object} Order
 * @property {string} id              - UUID primary key
 * @property {string} order_id        - Display ID, e.g. "#KP3X9A2B"
 * @property {string|null} user_id    - nullable for guest orders
 * @property {string} customer_name
 * @property {string} customer_phone
 * @property {string} customer_whatsapp
 * @property {string} address
 * @property {string} city
 * @property {string} state
 * @property {string} pincode
 * @property {string} product_name
 * @property {string|null} selected_size
 * @property {number} subtotal
 * @property {number} gst_amount
 * @property {number} total_amount
 * @property {string} payment_method  - e.g. "UPI"
 * @property {'pending'|'confirmed'|'shipped'|'delivered'|'cancelled'} status
 * @property {CartItem[]} cart_items  - full cart snapshot stored as JSONB
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} WishlistItem
 * @property {string} id
 * @property {string} user_id
 * @property {string} product_id
 * @property {string} created_at
 */

/**
 * @typedef {Object} NewsletterSubscriber
 * @property {string} id
 * @property {string} email
 * @property {string} subscribed_at
 * @property {boolean} is_active
 */

/**
 * @typedef {Object} PersistedCartItem
 * @property {string} id
 * @property {string} user_id
 * @property {string} product_id
 * @property {CartItem} product_snapshot
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} AuthUser
 * Augmented user object combining Supabase Auth user + profile
 * @property {string} id
 * @property {string} email
 * @property {Profile|null} profile
 * @property {'user'|'admin'} role
 */

export {};
