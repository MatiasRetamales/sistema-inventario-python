-- DROP SCHEMA public;
CREATE SCHEMA IF NOT EXISTS public AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP SEQUENCE public.auditoria_auditoria_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.auditoria_auditoria_id_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1
    NO CYCLE;
-- DROP SEQUENCE public.categoria_categoria_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.categoria_categoria_id_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1
    NO CYCLE;
-- DROP SEQUENCE public.detalle_movimiento_detalle_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.detalle_movimiento_detalle_id_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1
    NO CYCLE;
-- DROP SEQUENCE public.movimiento_movimiento_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.movimiento_movimiento_id_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1
    NO CYCLE;
-- DROP SEQUENCE public.producto_producto_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.producto_producto_id_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1
    NO CYCLE;
-- DROP SEQUENCE public.proveedor_proveedor_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.proveedor_proveedor_id_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1
    NO CYCLE;
-- DROP SEQUENCE public.rol_rol_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.rol_rol_id_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1
    NO CYCLE;
-- DROP SEQUENCE public.usuario_usuario_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.usuario_usuario_id_seq
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 2147483647
    START 1
    CACHE 1
    NO CYCLE;-- public.categoria definition

-- Drop table

-- DROP TABLE public.categoria;

CREATE TABLE IF NOT EXISTS public.categoria (
                                  categoria_id serial4 NOT NULL,
                                  nombre varchar(255) NOT NULL,
                                  CONSTRAINT categoria_nombre_key UNIQUE (nombre),
                                  CONSTRAINT categoria_pkey PRIMARY KEY (categoria_id)
);
CREATE INDEX IF NOT EXISTS idx_categoria_nombre ON public.categoria USING btree (nombre);


-- public.proveedor definition

-- Drop table

-- DROP TABLE public.proveedor;

CREATE TABLE IF NOT EXISTS public.proveedor (
                                  proveedor_id serial4 NOT NULL,
                                  nombre varchar(255) NOT NULL,
                                  contacto varchar(255) NULL,
                                  telefono varchar(20) NULL,
                                  email varchar(255) NULL,
                                  direccion json NULL,
                                  CONSTRAINT proveedor_pkey PRIMARY KEY (proveedor_id)
);
CREATE INDEX IF NOT EXISTS idx_proveedor_nombre ON public.proveedor USING btree (nombre);


-- public.rol definition

-- Drop table

-- DROP TABLE public.rol;

CREATE TABLE IF NOT EXISTS public.rol (
                            rol_id serial4 NOT NULL,
                            nombre varchar(50) NOT NULL,
                            CONSTRAINT rol_nombre_key UNIQUE (nombre),
                            CONSTRAINT rol_pkey PRIMARY KEY (rol_id)
);


-- public.usuario definition

-- Drop table

-- DROP TABLE public.usuario;

CREATE TABLE IF NOT EXISTS public.usuario (
                                usuario_id serial4 NOT NULL,
                                nombre varchar(100) NOT NULL,
                                apellido varchar(100) NOT NULL,
                                direccion text NULL,
                                username varchar(50) NOT NULL,
                                password_hash text NOT NULL,
                                rol_id int4 DEFAULT 1 NOT NULL,
                                estado bool DEFAULT true NOT NULL,
                                fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP NULL,
                                fecha_actualizacion timestamp DEFAULT CURRENT_TIMESTAMP NULL,
                                CONSTRAINT usuario_pkey PRIMARY KEY (usuario_id),
                                CONSTRAINT usuario_username_key UNIQUE (username),
                                CONSTRAINT usuario_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.rol(rol_id)
);
CREATE INDEX IF NOT EXISTS idx_usuario_username ON public.usuario USING btree (username);


-- public.auditoria definition

-- Drop table

-- DROP TABLE public.auditoria;

CREATE TABLE IF NOT EXISTS public.auditoria (
                                  auditoria_id serial4 NOT NULL,
                                  tabla varchar(50) NOT NULL,
                                  operacion text NOT NULL,
                                  usuario_id int4 NOT NULL,
                                  fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
                                  descripcion text NULL,
                                  CONSTRAINT auditoria_operacion_check CHECK ((operacion = ANY (ARRAY['INSERT'::text, 'UPDATE'::text, 'DELETE'::text]))),
                                  CONSTRAINT auditoria_pkey PRIMARY KEY (auditoria_id),
                                  CONSTRAINT auditoria_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id)
);
CREATE INDEX IF NOT EXISTS idx_auditoria_operacion ON public.auditoria USING btree (operacion);
CREATE INDEX IF NOT EXISTS idx_auditoria_tabla ON public.auditoria USING btree (tabla);


-- public.movimiento definition

-- Drop table

-- DROP TABLE public.movimiento;

CREATE TABLE IF NOT EXISTS public.movimiento (
                                   movimiento_id serial4 NOT NULL,
                                   tipo_movimiento text NOT NULL,
                                   fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
                                   usuario_id int4 NOT NULL,
                                   CONSTRAINT movimiento_pkey PRIMARY KEY (movimiento_id),
                                   CONSTRAINT movimiento_tipo_movimiento_check CHECK ((tipo_movimiento = ANY (ARRAY['Entrada'::text, 'Salida'::text]))),
                                   CONSTRAINT movimiento_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id)
);
CREATE INDEX IF NOT EXISTS idx_movimiento_fecha ON public.movimiento USING btree (fecha);
CREATE INDEX IF NOT EXISTS idx_movimiento_tipo ON public.movimiento USING btree (tipo_movimiento);


-- public.producto definition

-- Drop table

-- DROP TABLE public.producto;

CREATE TABLE IF NOT EXISTS public.producto (
                                 producto_id serial4 NOT NULL,
                                 nombre varchar(255) NOT NULL,
                                 categoria_id int4 NOT NULL,
                                 stock_actual int4 DEFAULT 0 NOT NULL,
                                 stock_minimo int4 NOT NULL,
                                 stock_maximo int4 NOT NULL,
                                 precio numeric(10, 2) NOT NULL,
                                 proveedor_id int4 NULL,
                                 estado bool DEFAULT true NOT NULL,
                                 fecha_caducidad date NULL,
                                 fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP NULL,
                                 fecha_actualizacion timestamp DEFAULT CURRENT_TIMESTAMP NULL,
                                 usuario_id int4 NULL,
                                 CONSTRAINT producto_pkey PRIMARY KEY (producto_id),
                                 CONSTRAINT fk_producto_usuario FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id),
                                 CONSTRAINT producto_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categoria(categoria_id),
                                 CONSTRAINT producto_proveedor_id_fkey FOREIGN KEY (proveedor_id) REFERENCES public.proveedor(proveedor_id)
);
CREATE INDEX IF NOT EXISTS idx_producto_categoria_id ON public.producto USING btree (categoria_id);
CREATE INDEX IF NOT EXISTS idx_producto_nombre ON public.producto USING btree (nombre);

-- public.detalle_movimiento definition

-- Drop table

-- DROP TABLE public.detalle_movimiento;

CREATE TABLE IF NOT EXISTS public.detalle_movimiento (
                                           detalle_id serial4 NOT NULL,
                                           movimiento_id int4 NOT NULL,
                                           producto_id int4 NOT NULL,
                                           cantidad int4 NOT NULL,
                                           CONSTRAINT detalle_movimiento_cantidad_check CHECK ((cantidad > 0)),
                                           CONSTRAINT detalle_movimiento_pkey PRIMARY KEY (detalle_id),
                                           CONSTRAINT detalle_movimiento_movimiento_id_fkey FOREIGN KEY (movimiento_id) REFERENCES public.movimiento(movimiento_id),
                                           CONSTRAINT detalle_movimiento_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.producto(producto_id)
);
CREATE INDEX IF NOT EXISTS idx_detalle_movimiento_movimiento_id ON public.detalle_movimiento USING btree (movimiento_id);
CREATE INDEX IF NOT EXISTS idx_detalle_movimiento_producto_id ON public.detalle_movimiento USING btree (producto_id);



-- DROP FUNCTION public.auditoria_producto();

CREATE OR REPLACE FUNCTION public.auditoria_producto()
    RETURNS trigger
    LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO auditoria (tabla, operacion, usuario_id, fecha, descripcion)
    VALUES (
               'producto',
               TG_OP,
               NEW.usuario_id, -- Ahora este campo existe
               CURRENT_TIMESTAMP,
               CASE
                   WHEN TG_OP = 'INSERT' THEN 'Nuevo producto creado: ' || NEW.nombre
                   WHEN TG_OP = 'UPDATE' THEN 'Producto actualizado: ' || NEW.nombre
                   WHEN TG_OP = 'DELETE' THEN 'Producto eliminado: ' || OLD.nombre
                   END
           );
    RETURN NEW;
END;
$function$
;

-- DROP FUNCTION public.registrar_movimiento(text, int4, int4, int4);

CREATE OR REPLACE FUNCTION public.registrar_movimiento(p_tipo_movimiento text, p_producto_id integer, p_cantidad integer, p_usuario_id integer)
    RETURNS void
    LANGUAGE plpgsql
AS $function$
DECLARE
    _movimiento_id INT;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM producto WHERE producto_id = p_producto_id) THEN
        RAISE EXCEPTION 'El producto con ID % no existe.', p_producto_id;
    END IF;

    IF p_tipo_movimiento = 'Salida' AND
       (SELECT stock_actual FROM producto WHERE producto_id = p_producto_id) < p_cantidad THEN
        RAISE EXCEPTION 'Stock insuficiente para el producto con ID %.', p_producto_id;
    END IF;

    INSERT INTO movimiento (tipo_movimiento, fecha, usuario_id)
    VALUES (p_tipo_movimiento, CURRENT_TIMESTAMP, p_usuario_id)
    RETURNING movimiento_id INTO _movimiento_id;

    INSERT INTO detalle_movimiento (movimiento_id, producto_id, cantidad)
    VALUES (_movimiento_id, p_producto_id, p_cantidad);

    IF p_tipo_movimiento = 'Entrada' THEN
        UPDATE producto SET stock_actual = stock_actual + p_cantidad WHERE producto_id = p_producto_id;
    ELSE
        UPDATE producto SET stock_actual = stock_actual - p_cantidad WHERE producto_id = p_producto_id;
    END IF;
END;
$function$
;

-- DROP FUNCTION public.validar_stock_producto();

CREATE OR REPLACE FUNCTION public.validar_stock_producto()
    RETURNS trigger
    LANGUAGE plpgsql
AS $function$
BEGIN
    IF NEW.stock_minimo >= NEW.stock_maximo THEN
        RAISE EXCEPTION 'El stock mínimo no puede ser mayor o igual al stock máximo.';
    END IF;

    IF NEW.stock_actual < NEW.stock_minimo OR NEW.stock_actual > NEW.stock_maximo THEN
        RAISE EXCEPTION 'El stock actual debe estar entre el mínimo y el máximo permitido.';
    END IF;

    RETURN NEW;
END;
$function$
;

-- Table Triggers

create trigger trigger_validar_stock_producto before
    insert
    or
    update
    on
        public.producto for each row execute function validar_stock_producto();
create trigger trigger_auditoria_producto after
    insert
    or
    delete
    or
    update
    on
        public.producto for each row execute function auditoria_producto();
