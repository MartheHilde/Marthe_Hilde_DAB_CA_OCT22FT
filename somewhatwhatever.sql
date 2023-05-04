INSERT INTO Animals (name, birthday, adopted)
VALUES ('Coco', '2020-02-12', False),
('Ted', '2021-02-12', False),
('Coco', '2020-02-12', False),
('Everrest', "2019-02-12", False),
('Rocko', "2020-02-12", False),
('Goldy', "2023-02-12", False),
('Lizzy', "2020-02-12", False),
('Goga', '2018-02-12', False),
('Tweet Tweet', '2020-02-12', False),
('Toothless', '2017-02-12', False),
('Sophie', '2020-02-12', False),
('Teddy', '2021-02-12', False),
('Roger', '2020-02-18', False),

INSERT INTO Species (species)
VALUES ('Dwarf Hamster'), 
('Teddy bear hamster'), 
('Jack-Russel'), 
('Budgy'), 
('Tortouse'), 
('Gold Fish'),
('Lizzard'),
('Beareded Dragon'),
('Parrot'),
('Corn snake');

INSERT INTO Temperaments (temperament)
VALUES ('Calm'),
('Scared'),
('Energetic'),
('Happy'),
('Lazy')

INSERT INTO Sizes (size)
VALUES ('Small'),
('Medium'),
('Large');

INSERT INTO Users (fullName, username, password, role)
VALUES ('System admin', 'Admin', 'admin1234', 'admin'),
('User', 'User', 'user1234', 'member'),
('User2', 'User2', 'user1234', 'member')