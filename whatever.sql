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

INSERT INTO Sizes (size)
VALUES ('Small'),
('Medium'),
('Large');

INSERT INTO Animals (Name, Birthday, Adopted, SpeciesId, SizeId)
VALUES ('Coco', '2020-02-12', False, 1, 1),
('Ted', '2021-02-12', False, 2, 1),
('Coco', '2020-02-12', False, 3, 2),
('Everrest', "2019-02-12", False, 4, 1),
('Rocko', "2020-02-12", False, 5, 2),
('Goldy', "2023-02-12", False, 6, 1),
('Lizzy', "2020-02-12", False, 7, 2),
('Goga', '2018-02-12', False, 8, 3),
('Tweet Tweet', '2020-02-12', False, 9, 3),
('Toothless', '2017-02-12', False, 10, 2),
('Sophie', '2020-02-12', False, 1, 1),
('Teddy', '2021-02-12', False, 2, 1),
('Roger', '2020-02-18', False, 9, 3);

INSERT INTO Temperaments (temperament)
VALUES ('Calm'),
('Scared'),
('Energetic'),
('Happy'),
('Lazy');

INSERT INTO AnimalsTemperaments(AnimalId, TemperamentId)
VALUES (
(SELECT id FROM Animals WHERE Name = "AnimalName" AND SpeciesId = (SELECT id FROM Species WHERE Species = "AnimalSpecie")),
(SELECT id FROM Temperaments WHERE Temperament = "SelectTemperament")
)


INSERT INTO Users (fullName, username, password, roles)
VALUES ('System admin', 'Admin', 'admin1234', 'admin'),
('User', 'User', 'user1234', 'member'),
('User2', 'User2', 'user1234', 'member');