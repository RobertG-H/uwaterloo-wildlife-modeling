export const CONNECTIVITY_REF = [
  // 'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Connectivity_Map_Original/MapServer',
  'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Cycle_4_Connectivity_Map_Original/MapServer',
  // 'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Connectivity_Map_Tweaked/MapServer',
  'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Cycle_4_Connectivity_Map_Tweaked/MapServer',
];
export const ROAD_MORTALITY_REF = [
  'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Cycle_4_Road_Mortality_Hotspots_Original/MapServer',
  //'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Road_Mortality_Hotspots_Original/MapServer',
  //'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Road_Mortality_Hotspots_Tweaked/MapServer',
  'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Cycle_4_Road_Mortality_Hotspots_Tweaked/MapServer',
];

export const REGION_SELECT_REF = [
  'https://services1.arcgis.com/DwLTn0u9VBSZvUPe/arcgis/rest/services/Region_PreSelect/FeatureServer',
  'https://services1.arcgis.com/DwLTn0u9VBSZvUPe/arcgis/rest/services/Region_Selected/FeatureServer',
];

export const DEFAULT_LAYERS_REF = [
  //'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Southern_Ontario_Land_Cover/MapServer',
  'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Cycle_4_Land_Cover/MapServer',
  'https://tiles.arcgis.com/tiles/DwLTn0u9VBSZvUPe/arcgis/rest/services/Percent_Slope/MapServer',
];

export const CONNECTIVITY_LEGEND_CONVERT = ['Cycle 4 Connectivity Map Original', 'Cycle 4 Connectivity Map Tweaked'];
export const ROAD_MORTALITY_LEGEND_CONVERT = ['Cycle 4 Road Mortality Hotspots Original', 'Cycle 4 Road Mortality Hotspots Tweaked'];
export const DEFAULT_LAYERS_LEGEND_CONVERT = ['Cycle 4 Land Cover', 'Percent Slope'];

export const TILE_LAYER_LEGEND_COLORS: { [key: string]: string } = {
  'Cycle 4 Connectivity Map Original':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAuElEQVRYhc2XgQ3DIAwEH/ttQofoYN1/jpIlDokMcLp/I3C8vr8t8LNzkTzZnjAQN0zYMAM2LNzQDwscVSxwd7BAdbLAXTBQdX1kGih6ynvShtMsEDfkI+PHhu5w0JGzBguEr0O5aENfb3h/h82ea3klus3JT/5pIG4IAw90SBsajwxP+UMb8sDrh3KgQ5QnN91hBQxs9sKW4RVbNt0hvBEfiFwBP6Mx4J/HpIGhZoG8Id8hHJk2fAHiCxvGeZPeqwAAAABJRU5ErkJggg==',
  'Cycle 4 Connectivity Map Tweaked':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAuElEQVRYhc2XgQ3DIAwEH/ttQofoYN1/jpIlDokMcLp/I3C8vr8t8LNzkTzZnjAQN0zYMAM2LNzQDwscVSxwd7BAdbLAXTBQdX1kGih6ynvShtMsEDfkI+PHhu5w0JGzBguEr0O5aENfb3h/h82ea3klus3JT/5pIG4IAw90SBsajwxP+UMb8sDrh3KgQ5QnN91hBQxs9sKW4RVbNt0hvBEfiFwBP6Mx4J/HpIGhZoG8Id8hHJk2fAHiCxvGeZPeqwAAAABJRU5ErkJggg==',

  'Cycle 4 Road Mortality Hotspots Original':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA0klEQVRYhdXX0Q3CMAxF0RfquKmQkPhiAfafDVTa0lBilrj5IAMc5Tmy5dh+v4XAY+l6Ij2ZLgkGJzSxTGc4cproyIWOXFBPJm8sGCMMpnLA4FhZMPzLgvKBBcPpTuFvaCzYoYYw2OGG8PgKR70OYMvwcAjHQdSTtQz3cmS49cIzCzYaPNgSyj6CW68K3hxqokGU6xKZfxT2WBW8LOE13FHuT0C4hm/+UWBwQznJVhrc2MSyla7hQoMzDT5RTrKZfpQHHxkGXwFPbPbrKLG7XA/wByl0R/8q1H1mAAAAAElFTkSuQmCC',
  'Cycle 4 Road Mortality Hotspots Tweaked':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA0klEQVRYhdXX0Q3CMAxF0RfquKmQkPhiAfafDVTa0lBilrj5IAMc5Tmy5dh+v4XAY+l6Ij2ZLgkGJzSxTGc4cproyIWOXFBPJm8sGCMMpnLA4FhZMPzLgvKBBcPpTuFvaCzYoYYw2OGG8PgKR70OYMvwcAjHQdSTtQz3cmS49cIzCzYaPNgSyj6CW68K3hxqokGU6xKZfxT2WBW8LOE13FHuT0C4hm/+UWBwQznJVhrc2MSyla7hQoMzDT5RTrKZfpQHHxkGXwFPbPbrKLG7XA/wByl0R/8q1H1mAAAAAElFTkSuQmCC',
  'Percent Slope':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAA8CAYAAABmdppWAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAbklEQVRYhe2UgQ3AMAjDSuHdXbEH+vF2RI0UKXCABcRQ532+BVbF3iRv1ZYHJg003GEDMFggHkpmskB8hw0ewqHoe6h/y5YeDvAaKK/NeGgB9PNwxAaAvDbj4S2wwUP5UBzfl/rIId9h0h36nd4Puq4E2wUtx3QAAAAASUVORK5CYII=',
};

export const LAND_COVER_LEGEND_COLORS: { [key: string]: string } = {
  Beach:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmB//8z/KfEIEZGBkYUA6kFRg0cNXDUwFED6WwgrDyjmoHUAgAJMQNUcB1RQwAAAABJRU5ErkJggg==',
  'Sand Dune Systems':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmBX09V/afEIG6zNkYUA6kFRg0cNXDUwFED6WwgrDyjmoHUAgDzuAUZk6D/GAAAAABJRU5ErkJggg==',
  Cliff:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmBGRkZ/ykxaMaMGYwoBlILjBo4auCogaMG0tlAWHlGNQOpBQBMmgYaJBIdxgAAAABJRU5ErkJggg==',
  Alvar:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmBBSsY/lNi0IQIBkYUA6kFRg0cNXDUwFED6WwgrDyjmoHUAgBY0AQ6dICeTwAAAABJRU5ErkJggg==',
  Tallgrass:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmBl//v+0+JQbqMTowoBlILjBo4auCogaMG0tlAWHlGNQOpBQDWNgTCo825MQAAAABJRU5ErkJggg==',
  'Coniferous Forest':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAL0lEQVQ4jWNhoDJgoZ2BxT7/KTKpdwsjqoFUAqMGjho4auCogfQ2EFqeUc9AKgEAdCQEkyvPrKgAAAAASUVORK5CYII=',
  'Mixed Forest':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmB6z5u+E+JQUH8AYwoBlILjBo4auCogaMG0tlAWHlGNQOpBQDspQUDbcjKeAAAAABJRU5ErkJggg==',
  'Deciduous Forest':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmBiiHM/ykx6P6av4woBlILjBo4auCogaMG0tlAWHlGNQOpBQCOfAbaj0lVvQAAAABJRU5ErkJggg==',
  Wetland:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmB029/+k+JQZmqfIwoBlILjBo4auCogaMG0tlAWHlGNQOpBQDlxgTumnpGjAAAAABJRU5ErkJggg==',
  'Open Water':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAL0lEQVQ4jWNhoDJgoZ2Bviv+U2TS5ghGVAOpBEYNHDVw1MBRA+ltILQ8o56BVAIAYfAEXe1mu6MAAAAASUVORK5CYII=',
  Agriculture:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmB///v+0+JQYyMTowoBlILjBo4auCogaMG0tlAWHlGNQOpBQDG6gSWxYmm7AAAAABJRU5ErkJggg==',
  'Built-Up Area':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmBc+bM+U+JQSkpKYwoBlILjBo4auCogaMG0tlAWHlGNQOpBQAW+gV+Jn+P5gAAAABJRU5ErkJggg==',
  Undifferentiated:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmBDx8+/E+JQfLy8owoBlILjBo4auCogaMG0tlAWHlGNQOpBQDPwwSvxr/5WQAAAABJRU5ErkJggg==',
  Freeway:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmBJiYm/ykx6MyZM4woBlILjBo4auCogaMG0tlAWHlGNQOpBQCCOga2+EzM0QAAAABJRU5ErkJggg==',
  'Highway / Expressway':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmBBS6d/ykxaMKeckYUA6kFRg0cNXDUwFED6WwgrDyjmoHUAgBK+wYVepTJewAAAABJRU5ErkJggg==',
  'Arterial Road':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmBATaZ/ykxaMOR6YwoBlILjBo4auCogaMG0tlAWHlGNQOpBQBjuwZdBSttzAAAAABJRU5ErkJggg==',
  'Collector Road':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmB1/ue/afEIM0iKUYUA6kFRg0cNXDUwFED6WwgrDyjmoHUAgDuEgUH28rofQAAAABJRU5ErkJggg==',
  'Resource / Rec Road':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmBL/b9/0+JQRJOjIwoBlILjBo4auCogaMG0tlAWHlGNQOpBQDPKgStmTSueQAAAABJRU5ErkJggg==',
  'Service Road':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmB//e9+E+JQYxOEowoBlILjBo4auCogaMG0tlAWHlGNQOpBQDO/AStPA75dAAAAABJRU5ErkJggg==',
  'Alleyway / Laneway':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMUlEQVQ4jWNhoDJgoZmB1Y4X/1NiUOt+fUYUA6kFRg0cNXDUwFED6WwgrDyjmoHUAgAvuAXFpDZHSQAAAABJRU5ErkJggg==',
};
