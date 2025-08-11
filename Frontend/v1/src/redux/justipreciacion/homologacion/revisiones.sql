CREATE TABLE public.revision_checklist (
	id bigserial NOT NULL,
	checklist int8 NULL,
	revisor int8 NULL,
	tipo_revisor varchar NULL,
	fecha_creacion timestamp NULL,
	requerimientos json NULL,
	observaciones varchar NULL,
	total float8 NULL,
	estatus varchar NULL,
	parent int8 NULL,
	CONSTRAINT revision_checklist_pkey PRIMARY KEY (id),
	CONSTRAINT revision_checklist_checklist_fkey FOREIGN KEY (checklist) REFERENCES public.checklist(id),
	CONSTRAINT revision_checklist_parent_fkey FOREIGN KEY (parent) REFERENCES public.revision_checklist(id),
	CONSTRAINT revision_checklist_revisor_fkey FOREIGN KEY (revisor) REFERENCES public.usuarios(id)
);
CREATE INDEX ix_revision_checklist_parent ON public.revision_checklist USING btree (parent);


CREATE TABLE public.revision_data (
	id bigserial NOT NULL,
	homologacion_id int8 NOT NULL,
	"type" varchar(20) NOT NULL,
	appraisal_purpose varchar(100) NOT NULL,
	current_version varchar(10) DEFAULT 'v1'::character varying NULL,
	status public."revision_status" DEFAULT 'PENDIENTE'::revision_status NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	reviewed_at timestamptz NULL,
	can_review bool DEFAULT true NULL,
	can_edit bool DEFAULT true NULL,
	assigned_reviewer varchar(100) NULL,
	revisiones jsonb DEFAULT '[]'::jsonb NOT NULL,
	CONSTRAINT revision_data_pkey PRIMARY KEY (id),
	CONSTRAINT revision_data_type_check CHECK (((type)::text = ANY ((ARRAY['TERRENO'::character varying, 'RENTA'::character varying])::text[]))),
	CONSTRAINT uk_revision_data_unique UNIQUE (homologacion_id, type, appraisal_purpose),
	CONSTRAINT fk_revision_data_homologacion FOREIGN KEY (homologacion_id) REFERENCES public.homologacion(id) ON DELETE CASCADE
);
CREATE INDEX idx_revision_data_assigned_reviewer ON public.revision_data USING btree (assigned_reviewer);
CREATE INDEX idx_revision_data_created_at ON public.revision_data USING btree (created_at);
CREATE INDEX idx_revision_data_homologacion_id ON public.revision_data USING btree (homologacion_id);
CREATE INDEX idx_revision_data_pending ON public.revision_data USING btree (created_at) WHERE (status = 'PENDIENTE'::revision_status);
CREATE INDEX idx_revision_data_revisiones ON public.revision_data USING gin (revisiones);
CREATE INDEX idx_revision_data_status ON public.revision_data USING btree (status);
CREATE INDEX idx_revision_data_status_reviewer ON public.revision_data USING btree (status, assigned_reviewer);
CREATE INDEX idx_revision_data_type ON public.revision_data USING btree (type);

-- Table Triggers

create trigger update_revision_data_updated_at before
update
    on
    public.revision_data for each row execute function update_updated_at_column();
create trigger log_revision_data_changes after
insert
    or
update
    on
    public.revision_data for each row execute function log_revision_changes();

	CREATE TABLE public.revision_history (
	id bigserial NOT NULL,
	revision_data_id int8 NOT NULL,
	"action" varchar(100) NOT NULL,
	previous_data jsonb NULL,
	new_data jsonb NULL,
	performed_by varchar(100) NOT NULL,
	performed_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	description text NULL,
	CONSTRAINT revision_history_pkey PRIMARY KEY (id),
	CONSTRAINT fk_revision_history_revision_data FOREIGN KEY (revision_data_id) REFERENCES public.revision_data(id) ON DELETE CASCADE
);
CREATE INDEX idx_revision_history_action ON public.revision_history USING btree (action);
CREATE INDEX idx_revision_history_performed_at ON public.revision_history USING btree (performed_at);
CREATE INDEX idx_revision_history_performed_by ON public.revision_history USING btree (performed_by);
CREATE INDEX idx_revision_history_revision_data_id ON public.revision_history USING btree (revision_data_id);

CREATE TABLE public.revision_permissions (
	id bigserial NOT NULL,
	user_id varchar(100) NOT NULL,
	revision_data_id int8 NOT NULL,
	can_read bool DEFAULT true NULL,
	can_write bool DEFAULT false NULL,
	can_approve bool DEFAULT false NULL,
	can_delete bool DEFAULT false NULL,
	granted_by varchar(100) NOT NULL,
	granted_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	expires_at timestamptz NULL,
	CONSTRAINT revision_permissions_pkey PRIMARY KEY (id),
	CONSTRAINT uk_revision_permissions_user_revision UNIQUE (user_id, revision_data_id),
	CONSTRAINT fk_revision_permissions_revision_data FOREIGN KEY (revision_data_id) REFERENCES public.revision_data(id) ON DELETE CASCADE
);
CREATE INDEX idx_revision_permissions_granted_by ON public.revision_permissions USING btree (granted_by);
CREATE INDEX idx_revision_permissions_revision_data_id ON public.revision_permissions USING btree (revision_data_id);
CREATE INDEX idx_revision_permissions_user_id ON public.revision_permissions USING btree (user_id);
CREATE TABLE public.revision_suggestions (
	id bigserial NOT NULL,
	revision_data_id int8 NOT NULL,
	field_path varchar(500) NOT NULL,
	current_value text NULL,
	suggested_value text NULL,
	"comment" text NOT NULL,
	field_label varchar(200) NOT NULL,
	page int8 NOT NULL,
	reviewer varchar(100) NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	is_converted bool DEFAULT false NULL,
	CONSTRAINT revision_suggestions_pkey PRIMARY KEY (id),
	CONSTRAINT fk_revision_suggestions_revision_data FOREIGN KEY (revision_data_id) REFERENCES public.revision_data(id) ON DELETE CASCADE
);
CREATE INDEX idx_revision_suggestions_converted_created ON public.revision_suggestions USING btree (is_converted, created_at);
CREATE INDEX idx_revision_suggestions_created_at ON public.revision_suggestions USING btree (created_at);
CREATE INDEX idx_revision_suggestions_field_path ON public.revision_suggestions USING btree (field_path);
CREATE INDEX idx_revision_suggestions_is_converted ON public.revision_suggestions USING btree (is_converted);
CREATE INDEX idx_revision_suggestions_not_converted ON public.revision_suggestions USING btree (revision_data_id, created_at) WHERE (is_converted = false);
CREATE INDEX idx_revision_suggestions_page ON public.revision_suggestions USING btree (page);
CREATE INDEX idx_revision_suggestions_reviewer ON public.revision_suggestions USING btree (reviewer);
CREATE INDEX idx_revision_suggestions_revision_data_id ON public.revision_suggestions USING btree (revision_data_id);