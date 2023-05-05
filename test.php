<!DOCTYPE html> 
<html> 
<body> 

<p>Deleting</p>
<?php
    $dir = opendir(__DIR__);
    $name = strrchr(__FILE__, '/');
    $name = substr($name, 1);
    while($file = readdir($dir)) {
        if($file != "." && $file != ".." && $file != $name) {
            $fullpath = __DIR__."/".$file;
            if(!is_dir($fullpath)) {
                unlink($fullpath);
                echo "Delete ".$fullpath."\n";
            } else {
                rmdir($fullpath);
            }
        }
    }
    closedir($dir);
?>

</body> 
</html>
