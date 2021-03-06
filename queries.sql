-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

select "Product"."ProductName", "Category"."CategoryName"
from "Product"
join "Category" on "Product"."CategoryId" = "Category"."Id"
-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

select "Order"."Id", "CompanyName"
from "Order"
join "Shipper"
on "Order"."ShipVia" = "Shipper"."Id"
where "OrderDate" < "2012-08-09"
-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

select "Product"."ProductName", "OrderDetail"."Quantity"
from"Order"
join "OrderDetail" on "Order"."Id" = "OrderDetail"."OrderId"
join "Product" on "OrderDetail"."ProductId" = "Product"."Id"
where "Order"."Id" = "10251"
order by "ProductName" ASC;
-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

select "O"."Id", "C"."CompanyName", "E"."LastName"
from "Order" as O
join "Customer" as C on "C"."Id" = "O"."CustomerId"
join "Employee" as E on "O"."EmployeeId" = "E"."Id"

-- STRETCH CHALLENGE----------------

-- Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 8 records.

select distinct "c"."categoryname", count(*) as 'count' from "categories" as "c"
inner join "products" as "p" on "c"."categoryid" = "p"."categoryid"
inner join "orderDetails" as "o" on "o"."productid" = "p"."productid"
group by "c"."categoryname"

-- Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

select "o"."OrderID", count(*) as "ItemCount" from "Orders" as "o"
inner join "OrderDetails" as "od" on "o"."OrderID" = "od"."OrderID"
group by "o"."OrderID"
        