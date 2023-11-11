CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    url text NOT NULL,
    author text,
    likes integer default 0 
);
insert into blogs (title, url, author) values ('On let vs const', 'google.com', 'Dan Abramov')
insert into blogs (title, url, author) values ('Gaps in sequences in PostgreSQL', 'google.com', 'Laurenz Albe')