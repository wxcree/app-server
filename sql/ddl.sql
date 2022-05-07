create database sysdb;
create database dataset;
use sysdb;

create table business_pkg
(
    id             int unsigned auto_increment
        primary key,
    name           varchar(255) not null,
    create_time    datetime     null,
    create_user_id int          null,
    constraint business_pkg_pk
        unique (name)
)
    charset = utf8mb3;

create table business_tables
(
    id             int unsigned auto_increment
        primary key,
    table_name     varchar(255) not null,
    db_name        varchar(255) not null,
    pkgid          int          null,
    create_time    datetime     null,
    create_user_id int          null,
    type           int          not null,
    constraint business_tables_pk
        unique (table_name)
)
    charset = utf8mb3;

create table dashboard_basic
(
    id             int unsigned auto_increment
        primary key,
    name           varchar(255) not null,
    style          varchar(255) not null,
    type           int          not null,
    table_id       int          not null,
    create_time    datetime     null,
    create_user_id int          null
)
    charset = utf8mb3;

create table dashboard_info
(
    id           int unsigned auto_increment
        primary key,
    dashboard_id int not null,
    table_id     int not null,
    column_id    int not null
)
    charset = utf8mb3;

create table table_columns
(
    id             int unsigned auto_increment
        primary key,
    table_id       int          null,
    column_name    varchar(255) not null,
    column_alias   varchar(255) not null,
    type           varchar(255) not null,
    create_time    datetime     null,
    create_user_id int          null,
    edit_time      datetime     null
)
    charset = utf8mb3;

create table table_relation
(
    id          int unsigned auto_increment
        primary key,
    table_id_1  int not null,
    table_id_2  int not null,
    column_id_1 int not null,
    column_id_2 int not null
)
    charset = utf8mb3;

create table users
(
    id       int unsigned auto_increment
        primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    rola     int          null
)
    charset = utf8mb3;


