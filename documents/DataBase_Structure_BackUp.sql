CREATE DATABASE work4me;

USE work4me;

CREATE TABLE CATEGORIES (
	idCategory int Not Null Auto_Increment,
	nameCategory varchar(50) Not Null,
	primary key(idCategory)
);

CREATE TABLE CITIES (
	idCity int Not Null Auto_Increment,
    nameCity varchar(50) Not Null,
    primary key(idCity)
);

CREATE TABLE COMPANIES (
	tin varchar(30) Not Null,
	nameCompany varchar(50) Not Null,
    logo longblob Not Null,
    name1_R varchar(50) Not Null,
    name2_R varchar(50),
    lastName1_R varchar(50) Not Null,
    lastName2_R varchar(50),
    description varchar(150) Not Null,
    companyEmail varchar(70) Not Null, 
    phoneNumber varchar(50) Not Null,
    password varchar(50) Not Null,
    primary key(tin)
);

CREATE TABLE CANDIDATES(
	idCandidate varchar(30) Not Null,
    birthday date Not Null,
    profilePic longblob Not Null,
    name1 varchar(50) Not Null,
	name2 varchar(50),
    lastName1 varchar(50) Not Null, 
    lastName2 varchar(50),
    email varchar(70) Not Null,
    password varchar(50) Not Null,
    phoneNumber varchar(20) Not Null,
    description varchar(150) Not Null,
    idCityfk int Not Null,
    primary key(idCandidate),
    foreign key (idCityfk) references cities(idCity)
);

CREATE TABLE VACANCIES(
	idVacant int Not Null Auto_Increment,
    description varchar(150) Not Null,
    publicationDate timestamp Not Null Default Current_Timestamp,
    salary float Not Null,
    idCityfk int,
    idCategoryfk int Not Null,
    idCompanyfk varchar(30) Not Null,
    primary key (idVacant),
    foreign key (idCityfk) references cities(idCity),
    foreign key (idCategoryfk) references categories(idCategory),
    foreign key (idCompanyfk) references companies(tin)
);

CREATE TABLE APPLICATIONS(
	idApplication int Not Null Auto_Increment,
    applicationDate timestamp Not Null Default Current_Timestamp,
	approved boolean Not Null,
    cv longBlob Not Null,
    idVacancyfk int Not Null, 
    idCandidatefk varchar(30) Not Null,
    primary key (idApplication),
    foreign key (idVacancyfk) references vacancies(idVacant),
    foreign key (idCandidatefk) references candidates(idCandidate)
);


