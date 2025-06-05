/*create database restaurant_udemy*/

use restaurant_udemy

create table categorias(
	nom_categoria varchar(200) primary key not null,
	img_categoria varchar(200) not null
);

create table platillos(
	nom_platillo varchar(200) primary key not null,
	descripcion_platillo text,
	precio double,
	nom_categoria varchar(200)
);

insert into categorias values("bebidas", "icon_bebidas.png");
insert into categorias values("botanas", "icon_botana.png");
insert into categorias values("cena", "icon_cena.png");
insert into categorias values("comida", "icon_comida.png");
insert into categorias values("desayuno", "icon_desayuno.png");
insert into categorias values("postres", "icon_postres.png");
insert into categorias values("promo", "icon_promo.png");

insert into platillos values("Cupcake","", 45.0, 5.0, "postres");