<?php

$dir = scandir('./img/detailPics/');

$file = file('./list.txt');

$i = 0;
$j = 0;

foreach($file as $keys => $values){
	$values = trim($values);
	$array[$i][$j] = $values;
	
	$j++;

	if(($keys+1) % 4 == 0){
		$i++;
		$j = 0;
	}
}

foreach($array as $keys => $values){
	$array[$keys][4] = trim(explode(".",$array[$keys][0])[1]);
	foreach($dir as $a){
		$b = similar_text($array[$keys][0], substr($a, 0, strlen($array[$keys][0])), $per);
		if($per>80){
			$array[$keys][0] = $a;
		}
	}	
}

//print_r($array);

foreach($array as $values){
	echo '
	      <div class="item">
                <div class="shadow-effect" style="background-color: #202060;">
                  <img height="150px" width="150px"
                    class="rounded-circle"
                    src="img/detailPics/'.$values[0].'"
                    alt=""
                  />
                  <p class="text-white">
                    '.$values[2].'
                  </p>
                  <h7 class="text-white">
                    '.$values[3].'
                  </h7>
                  <hr />
                  <p class="text-white">
                    '.$values[1].'
                  </p>
                </div>
                <div class="testimonial-name" style="background-color: #fb5b5a;">'.strtoupper($values[4]).'</div>
              </div>
	';
}

?>