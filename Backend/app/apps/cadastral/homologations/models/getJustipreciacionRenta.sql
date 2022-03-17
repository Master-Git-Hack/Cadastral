select registro, 
	proposito_avaluo, 
	cna_superficie as superficie,
	cna_edad as edad
from justipreciacion 
where id={{ID}};