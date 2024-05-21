from os import remove
from urllib.request import urlretrieve

from PIL import Image
from pyproj import Proj, transform

from .. import config


class Layers:
    ROADMAP = "m"
    SATELLITE = "s"
    HYBRID = "y"
    TERRAIN = "p"
    TERRAIN_ONLY = "t"
    ALTERED_ROADMAP = "r"


class GoogleMaps:
    lat: float = 0
    lng: float = 0
    zoom: int = 12
    layer: str = Layers.SATELLITE
    x_utm: float = 0
    y_utm: float = 0

    def __init__(
        self,
        lat: float = 0,
        lng: float = 0,
        x_utm: float = 0,
        y_utm: float = 0,
        zoom: int = 12,
        layer=Layers.SATELLITE,
    ):
        if lat and lng:
            self.lat = lat
            self.lng = lng
            self.latlng_to_utm(lat, lng)
        if x_utm and y_utm:
            self.x_utm = x_utm
            self.y_utm = y_utm
            self.utm_to_latlng(x_utm, y_utm)
        self.zoom = zoom
        self.layer = layer

    def utm_to_latlng(self, x: float = 0, y: float = 0, zone: int = 14, northern=True):
        if northern:
            proj = Proj(proj="utm", zone=zone, ellps="WGS84")
            coord = Proj(proj="latlong", datum="WGS84")
        else:
            proj = Proj(proj="utm", zone=zone, ellps="WGS84", south=True)
            coord = Proj(proj="latlong", datum="WGS84", south=True)
        self.lng, self.lat = transform(proj, coord, x, y)
        return self.lat, self.lng

    def latlng_to_utm(self, lat: float = 0, lng: float = 0):
        proj = Proj(proj="utm", zone=14, ellps="WGS84")
        coord = Proj(proj="latlong", datum="WGS84")
        self.x_utm, self.y_utm = transform(coord, proj, lng, lat)
        return self.x_utm, self.y_utm

    def __generate_image(self, tile_width: int = 5, tile_height: int = 8):
        width = tile_width * 256
        height = tile_height * 256
        img = Image.new("RGB", (width, height))
        for x in range(0, tile_width):
            for y in range(0, tile_height):
                urlretrieve(
                    f"https://mt0.google.com/vt?lyrs={self.layer}&x={self.x_utm + x}&y={self.y_utm + y}&z={self.zoom}",
                    (current_tile := f"{x}-{y}"),
                )
                im = Image.open(current_tile)
                img.paste(im, (x * 256, y * 256))
                remove(current_tile)
        return img

    def get_image(self, filename: str, **kwargs):
        try:
            img = self.__generate_image(**kwargs)
        except IOError:
            print(
                f"Could not generate the image - try adjusting the zoom level {self.zoom} to {self.zoom:=self.zoom-1}"
            )
            img = self.__generate_image(**kwargs)
        else:
            filename += ".png"
            path = f"{ config.PATHS.tmp}/{filename}"
            img.save(path)
            return filename, path
