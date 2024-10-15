-- Everything for policies and evidence

CREATE TABLE evidence (
  id INTEGER PRIMARY KEY,
  file_path TEXT NULL,
  link TEXT NULL,
  description TEXT NULL
);

CREATE TABLE evidence_list (
  id INTEGER PRIMARY KEY
);

CREATE TABLE evidence_list_evidence (
  id INTEGER PRIMARY KEY,
  evidence_list_id INTEGER NOT NULL REFERENCES evidence_list (id),
  evidence_id INTEGER NOT NULL REFERENCES evidence (id),
  UNIQUE (evidence_list_id, evidence_id)
);

CREATE TABLE revision (
  id INTEGER PRIMARY KEY,
  version TEXT NOT NULL UNIQUE,
  date_competed DATETIME,
  system_info TEXT, -- JSON text with all the info for the system for this revision except evidence
  information_description INTEGER NOT NULL REFERENCES evidence_list (id),
  system_top_evi INTEGER  NOT NULL REFERENCES evidence_list (id),
  hardware_listing INTEGER NOT NULL REFERENCES evidence_list (id),
  software_listing INTEGER NOT NULL REFERENCES evidence_list (id),
  based_on INTEGER NOT NULL REFERENCES revision (id)
);

CREATE TABLE policy (
  id INTEGER PRIMARY KEY,
  revision_id INTEGER NOT NULL REFERENCES revision (id),
  policy_description TEXT,
  plan_description TEXT,
  na_description TEXT,
  implementation_status TEXT NOT NULL DEFAULT 0,
  control INTEGER NOT NULL,
  section INTEGER NOT NULL,
  evidence_list INTEGER NOT NULL REFERENCES evidence_list (id),
  UNIQUE (revision_id, control)
);

CREATE TABLE cron_entity (
  id INTEGER PRIMARY KEY,
  revision_id INTEGER NOT NULL REFERENCES revision_id,
  name TEXT,
  UNIQUE (revision_id, name)
);

CREATE TABLE cron (
  id INTEGER PRIMARY KEY,
  revision_id INTEGER NOT NULL REFERENCES revision (id),
  cron_entity_id INTEGER NOT NULL REFERENCES cron_entity (id),
  description_ev INTEGER NOT NULL REFERENCES evidence_list (id),
  UNIQUE(revision_id, cron_entity_id)
);

-- Auto generated indexes by ChatGPT


-- Index for foreign key columns in `evidence_list`
CREATE INDEX idx_evidence_list_list ON evidence_list(list);
CREATE INDEX idx_evidence_list_evidence_id ON evidence_list(evidence_id);

-- Indexes for foreign key columns in `revision`
CREATE INDEX idx_revision_information_description ON revision(information_description);
CREATE INDEX idx_revision_system_top_evi ON revision(system_top_evi);
CREATE INDEX idx_revision_hardware_listing ON revision(hardware_listing);
CREATE INDEX idx_revision_software_listing ON revision(software_listing);
CREATE INDEX idx_revision_based_on ON revision(based_on);

-- Index for foreign key in `policy`
CREATE INDEX idx_policy_revision_id ON policy(revision_id);
CREATE INDEX idx_policy_evidence_list_id ON policy(evidence_list_id);

-- Indexes for foreign key columns in `cron_entity`
CREATE INDEX idx_cron_entity_revision_id ON cron_entity(revision_id);

-- Indexes for foreign key columns in `cron`
CREATE INDEX idx_cron_revision_id ON cron(revision_id);
CREATE INDEX idx_cron_cron_entity_id ON cron(cron_entity_id);
CREATE INDEX idx_cron_description_ev ON cron(description_ev);


-- Create new evidence lists for first revision
INSERT INTO evidence_list DEFAULT VALUES; -- for information_description
INSERT INTO evidence_list DEFAULT VALUES; -- for system_top_evi
INSERT INTO evidence_list DEFAULT VALUES; -- for hardware_listing
INSERT INTO evidence_list DEFAULT VALUES; -- for software_listing

-- Capture the last inserted IDs for the new evidence lists
WITH evidence_lists AS (
  SELECT 
    (SELECT id FROM evidence_list ORDER BY id DESC LIMIT 1) AS software_listing,
    (SELECT id FROM evidence_list ORDER BY id DESC LIMIT 1 OFFSET 1) AS hardware_listing,
    (SELECT id FROM evidence_list ORDER BY id DESC LIMIT 1 OFFSET 2) AS system_top_evi,
    (SELECT id FROM evidence_list ORDER BY id DESC LIMIT 1 OFFSET 3) AS information_description
)
-- Insert the new revision and associate the evidence lists
INSERT INTO revision (version, information_description, system_top_evi, hardware_listing, software_listing)
SELECT '1.0', information_description, system_top_evi, hardware_listing, software_listing
FROM evidence_lists;

