base = set(
    [
        "uid",
        "table_name",
        "schema_name",
        "title",
        "abstract",
        "categories",
        "keywords",
        "spatial_level",
        "minimum_optimal_scale",
        "maximum_optimal_scale",
        "publication_date",
        "publication_frequency",
        "license",
        "confidentiality",
        "feature_count",
        "geometry_type",
        "projection_name",
        "projection_authid",
        "spatial_extent",
        "creation_date",
        "update_date",
        "geom",
        "data_last_update",
        "themes",
    ]
)
changes = set(
    [
        "uid",
        "table_name",
        "schema_name",
        "title",
        "abstract",
        "categories",
        "keyword",
        "spatial_level",
        "minimum_optimal_scale",
        "maximum_optimal_scale",
        "publication_date",
        "publication_frequency",
        "license",
        "confidentiality",
        "feature_count",
        "geometry_type",
        "projection_name",
        "projection_authid",
        "spatial_extent",
        "creation_date",
        "update_date",
        "geom",
        "data_last_update",
        "themes",
        "purpose",
        "md_dataidentification_language",
        "topiccategory",
        "groupcategory",
        "presentationform",
        "ci_onlineresource_linkage",
        "maintenanceandupdatefrequency",
        "md_dataidentification_characterset",
        "specuse",
        "datestamp",
        "datetype",
        "date_creation",
        "inpname",
        "ci_responsibleparty_individualname",
        "ci_responsibleparty_organisationname",
        "ci_responsibleparty_positionname",
        "ci_responsibleparty_linkage",
        "ci_responsibleparty_role",
        "westboundlongitude",
        "eastboundlongitude",
        "southboundlatitude",
        "northboundlatitude",
        "spatialrepresentationtype",
        "latres",
        "longres",
        "geogunit",
        "lambertc_stdparll",
        "lambertc_longcm",
        "mercatort_latprjo",
        "mercator_feast",
        "mercator_fnorth",
        "mercator_sfec",
        "coord_repres",
        "ordres",
        "absres",
        "distance_res",
        "bearing_res",
        "bearing_uni",
        "ref_bearing_dir",
        "ref_bearing_mer",
        "plandu",
        "local_desc",
        "local_geo_inf",
        "horizdn",
        "ellips",
        "semiaxis",
        "altenc",
        "altres",
        "altunits",
        "altdatum",
        "depthdn",
        "depthres",
        "depthdu",
        "level",
        "dq_quantitativeresult",
        "dq_completeness_nameofmeasure",
        "dq_logicconsistency_nameofmeasure",
        "positionalaccuracy_nameofmeasure",
        "temporalaccuracy_nameofmeasure",
        "thematicaccuracy_nameofmeasure",
        "dq_completeness_measuredescription",
        "dq_logicconsistency_measuredescription",
        "positionalaccuracy_measuredescription",
        "temporalaccuracy_measuredescription",
        "thematicaccuracy_measuredescription",
        "positionalaccuracy_valueunit",
        "temporalaccuracy_valueunit",
        "thematicaccuracy_valueunit",
        "statement",
        "entity_detail",
        "graphfilename",
        "md_format",
        "edition",
        "metadatastandardname",
        "metadatastandardversion",
        "date",
        "md_referencesystem",
        "geographicelement",
        "planar",
        "mapprojn",
        "gridcoordinatessystem",
        "utm_zone",
    ]
)
from difflib import get_close_matches
from pprint import pprint


def compare_sets(set1, set2):
    similar = set1 & set2
    different_elements = set2 - set1 if set2 - set1 else set2

    closest = {element: get_close_matches(element, set2) for element in set1}

    return closest, different_elements


def generate_alter_table_query(table_name, closest, different_elements):
    queries = []

    # Generate queries for renaming columns based on closest matches
    for old_column, new_column in closest.items():
        if old_column == new_column:
            continue
        if len(new_column) == 0:
            continue
        new_column = new_column[0]
        query = f"ALTER TABLE {table_name} RENAME COLUMN {old_column} TO {new_column};"
        queries.append(query)

    # Generate queries for adding new columns
    for column in different_elements:
        column_type = ""
        if "date" in column.lower():
            column_type = "DATE"
        elif "time" in column.lower():
            column_type = "TIMESTAMP"
        else:
            column_type = "FLOAT8"

        query = f"ALTER TABLE {table_name} ADD COLUMN {column} {column_type};"
        queries.append(query)

    return queries


for query in generate_alter_table_query("dataset", *compare_sets(base, changes)):
    print(query)
# closest_matches, equal, different = compare_sets(base, changes)
# print("Closest matches: ")
# pprint(closest_matches)
# print(
#     "Equal: ",
# )
# pprint(equal)
# print(
#     "Different: ",
# )
# pprint(different)
