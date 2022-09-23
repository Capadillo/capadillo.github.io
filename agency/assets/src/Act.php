<?php

class Act
{
    private $id;
    private $name;
    private $suburb;
    private $biography;

    public function __construct($id, $name, $suburb, $biography)
    {
        $this->set_id($id)
             ->set_name($name)
             ->set_suburb($suburb)
             ->set_biography($biography);
    }

    public function set_id($id)
    {
        if (!is_null($this->id)) {
            throw new OverflowException(
                "Act ID has already been set."
            );
        }

        $this->id = $id;
        return $this;
    }

    public function set_name($name)
    {
        $this->name = $name;
        return $this;
    }

    public function set_suburb($suburb)
    {
        $this->suburb = $suburb;
        return $this;
    }

    public function set_biography($biography)
    {
        $this->biography = $biography;
        return $this;
    }

    public function get_id()
    {
        return $this->id;
    }

    public function get_name()
    {
        return $this->name;
    }

    public function get_suburb()
    {
        return $this->suburb;
    }

    public function get_biography()
    {
        return $this->biography;
    }
}
