<?php

date_default_timezone_set("Australia/Sydney");

$acts = {
    1 => {
        "name" => "Agency",
        "location" => "Ashtonfield, "
    }
};

# --------------------------------------------------
# Act
# --------------------------------------------------

# ActID
# Name
# Location
# Biography

# --------------------------------------------------
# Act Timetable
# --------------------------------------------------

# ActID
# start
# end




$startA = strtotime("2000-01-01 09:59pm");
$endA   = strtotime("2000-01-02 03:00am");
$startB = strtotime("2000-01-01 10:00pm");
$endB   = strtotime("2000-01-02 02:00am");

$midA   = $startA + (($endA - $startA)  / 2);
$midB   = $startB + (($endB - $startB)  / 2);

$startA = date('Y-m-d H:i:s', $startA);
$midA   = date('Y-m-d H:i:s', $midA);
$endA   = date('Y-m-d H:i:s', $endA);

echo "{$startA} | {$midA} | {$endA} <br>";

$startB = date('Y-m-d H:i:s', $startB);
$midB   = date('Y-m-d H:i:s', $midB);
$endB   = date('Y-m-d H:i:s', $endB);

$has_conflict = is_between([ $startA, $midA, $endA ], $startB, $endB);

if ($has_conflict) {
    echo "Not Available";
}
