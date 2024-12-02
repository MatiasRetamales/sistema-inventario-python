FROM postgres:15

ENV POSTGRES_DB=${POSTGRES_DB}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_PORT=${POSTGRES_PORT}

COPY init-scripts/ddl_inventario.sql /docker-entrypoint-initdb.d/01_ddl_inventario.sql
COPY init-scripts/inserts_full_data.sql /docker-entrypoint-initdb.d/02_inserts_full_data.sql

EXPOSE 5432

