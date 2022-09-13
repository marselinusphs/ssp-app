/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/* SSP APP DATABASE STRUCTURE */

const products = {
  id: string,
  name: string,
  supplier_id: string,
  category_id: string,
  unit_price: integer,
  expired_date: date,
  buy_price: integer,
  units_in_stock: integer,
  units_per_box: integer,
  created_at: string,
  created_by: date,
  updated_at: string,
  updated_by: date,
  // tags: array,
};

const categories = {
  id: string,
  name: string,
  description: string,
  created_at: string,
  created_by: date,
  updated_at: string,
  updated_by: date,
};

const customers = {
  id: string,
  name: string,
  birth_date: date,
  phone: integer,
  email: string,
  address: string,
  subdistrict: string,
  regency: string,
  province: string,
  postal_code: integer,
  points: integer,
  created_at: string,
};

const orders = {
  id: string,
  customer_id: string,
  employee_id: string,
  order_date: date,
  total_price: integer,
  payment_method: string,
};

const order_details = {
  order_id: string,
  product_id: string,
  quantity: integer,
  unit_price: integer,
};

const employees = {
  id: string,
  password: string,
  name: string,
  title: string,
  birth_date: date,
  hire_date: date,
  phone: integer,
  email: string,
  address: string,
  subdistrict: string,
  regency: string,
  province: string,
  postal_code: integer,
  photo: image,
  status: string,
};

const suppliers = {
  id: string,
  company_name: string,
  contact_name: string,
  contact_title: string,
  phone: integer,
  email: string,
  address: string,
  subdistrict: string,
  regency: string,
  province: string,
  postal_code: integer,
};

const pharmacy_outlet = {
  id: string,
  name: string,
  address: string,
  subdistrict: string,
  regency: string,
  province: string,
  postal_code: integer,
  phone: integer,
  open_days: string,
  open_hours: string,
};

const stock_opname_in = {
  id: string,
  product_id: string,
  quantity: integer,
  date_in: date,
  supplier_id: string,
  employee_id: string,
};
