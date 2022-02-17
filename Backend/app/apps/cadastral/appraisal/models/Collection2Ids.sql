SELECT id 
FROM catastral c 
WHERE 
    estatus <> 0 
    AND registro LIKE '{{COLLECTION}}-%_{{YEAR}}' 
    AND (SPLIT_PART(SPLIT_PART(registro, '_', 1), '-', 2)::DECIMAL 
    BETWEEN {{START}} AND {{END}})
ORDER BY /*c.id */SPLIT_PART(SPLIT_PART(registro,'_',1),'-',2)::DECIMAL;