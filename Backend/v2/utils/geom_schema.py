from geoalchemy2 import Geography, Geometry, Raster, RasterElement
from geoalchemy2.shape import from_shape, to_shape
from marshmallow import ValidationError, fields, post_dump, pre_load
from marshmallow_sqlalchemy import ModelConverter
from shapely import geometry


class GeometryField(fields.Field):
    """
    Use shapely and geoalchemy2 to serialize / deserialize a point
    Does make a big assumption about the data being spat back out as
    JSON, but what the hey.
    """

    def _serialize(self, value, attr, obj):
        if value is None:
            return None
        return geometry.mapping(to_shape(value))

    def _deserialize(self, value, attr, data):
        if value is None:
            return None
        return from_shape(geometry.shape(value))


ModelConverter.SQLA_TYPE_MAPPING[Geography] = GeometryField
ModelConverter.SQLA_TYPE_MAPPING[Geometry] = GeometryField
ModelConverter.SQLA_TYPE_MAPPING[Raster] = fields.Raw
ModelConverter.SQLA_TYPE_MAPPING[RasterElement] = fields.Raw
