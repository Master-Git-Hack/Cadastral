select registro, 
	proposito_avaluo, 
	sp1_superficie as superficie,
	sp1_factor as factor
from justipreciacion 
where id={{ID}};