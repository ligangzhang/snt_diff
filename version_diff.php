<?php
#lcs
function longestCommonSubsequence($s1,$s2)
{
    $arr1 = explode(" ", $s1);
    $arr2 = explode(" ", $s2);
    $tmpArr1 = array();
    $tmpArr2 = array();
    for ($i = 0; $i < count($arr1) + 1; $i++) {
        for ($j = 0; $j < count($arr2) + 1; $j++) {
            $tmpArr1[$i][$j] = 0;
            $tmpArr2[$i][$j] = 0;
        }
    }
    for ($i = 0; $i < count($arr1); $i++) {
        for ($j = 0; $j < count($arr2); $j++) {
            #从对角过来
            if ($arr1[$i] == $arr2[$j]) {
                $tmpArr1[$i + 1][$j + 1] = $tmpArr1[$i][$j] + 1;
                $tmpArr2[$i][$j] = 0;
            } else {
                if ($tmpArr1[$i][$j + 1] > $tmpArr1[$i + 1][$j]) {
                    #从上面过来，从arr1获取，删除
                    $tmpArr1[$i + 1][$j + 1] = $tmpArr1[$i][$j + 1];
                    $tmpArr2[$i][$j] = 1;
                } else {
                    #从前面过来,从arr2获取，新增
                    $tmpArr1[$i + 1][$j + 1] = $tmpArr1[$i + 1][$j];
                    $tmpArr2[$i][$j] = -1;
                }
            }
        }
    }
    $max_length = $tmpArr1[count($arr1)][count($arr2)];

    $i = count($arr1) - 1;
    $j = count($arr2) - 1;
    $res = array();


    while ($max_length >= 0 and $j >= 0) {
        if ($tmpArr2[$i][$j] == 0) {
            $res[] = $arr2[$j];
            $j -= 1;
            $i -= 1;
            $max_length -= 1;
        } elseif ($tmpArr2[$i][$j] == -1) {
            $res[] = $arr2[$j] . "_add";
            $j -= 1;
        } elseif ($tmpArr2[$i][$j] == 1) {
            $res[] = $arr1[$i] . "_delete";
            $i -= 1;
        }
    }
    while ($i >= 0) {
        $res[] = $arr1[$i] . "_delete";
        $i -= 1;
    }

    return (implode(" ", array_reverse($res)));
}
$s1 = "a internationaly academic language which becomes importantly for modern worlds.";
$s2 = "academic language which becomes important for the modern world.";
$res = longestCommonSubsequence($s1,$s2);
print($res);
