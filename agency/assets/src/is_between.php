<?php

function is_between($number, $start, $end) {
    if (is_array($number)) {
        foreach ($number as $n) {
            if (is_between($n, $start, $end)) {
                return true;
            }
        }
    }

    return ($number >= $start) && ($number <= $end);
}
