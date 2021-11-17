<?php

namespace Caffelab\Laravel\Admin\KeyValues;

use Encore\Admin\Form\Field;

class KeyValuesField extends Field
{
    protected $view = 'laravel-admin-keyValues::index';

    protected static $js = [
        'vendor/caffelab/laravel-admin-keyValues/keyValues.js'
    ];

    protected static $css = [
        'vendor/caffelab/laravel-admin-keyValues/keyValues.css'
    ];

    public function render()
    {

        $this->script = <<< EOF
        window.DemoSku = new LaravelAdminKeyValues('{$this->getElementClassSelector()}')
        EOF;
        return parent::render();
    }

}
