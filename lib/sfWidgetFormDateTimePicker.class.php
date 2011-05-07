<?php
/**
 * Description of sfWidgetFormDateTimePicker
 *
 * @author TheCelavi
 */
class sfWidgetFormDateTimePicker extends sfWidgetFormDateTime {
    
    public function __construct($options = array(), $attributes = array()) {        
        parent::__construct($options, $attributes);
        $this->addOption('widget_width', sfConfig::get('dm_dmDateTimePicker_default_widget_width'));        
    }
    
    public function render($name, $value = null, $attributes = array(), $errors = array()) {          
        // This could be nice if we can use Front layout helper :)        
        return sprintf('
            <div class="dmDateTimePickerPlugin sfWidgetFormDateTimePicker">
                <input class="inputField" type="text" style="width:%s;" />
                <ul>
                    <li class="ui-state-default ui-corner-all button-show-picker">
                        <span class="ui-icon ui-icon-calendar"></span>
                    </li>
                    <li class="ui-state-default ui-corner-all button-reset-picker">
                        <span class="ui-icon ui-icon-close"></span>
                    </li>
                </ul>
                <span style="display:none">%s</span>
            </div>', $this->getOption('widget_width'), parent::render($name, $value, $attributes, $errors));
    }
    
    public function getJavaScripts() {
        $subcultures = sfConfig::get('dm_dmDateTimePickerPlugin_subcultures');
        $culture = dmContext::getInstance()->getUser()->getCulture();        
        if (isset ($subcultures[$culture])) $culture = $subcultures[$culture];        
        $javascripts = array();
        $javascripts[] = 'lib.ui-core';
        $javascripts[] = 'lib.ui-slider';
        $javascripts[] = 'lib.ui-datepicker';
        $javascripts[] = '/dmDateTimePickerPlugin/js/jquery-ui-timepicker-addon.js';
        if ($culture != 'en') {
            $javascripts[] = sprintf('/dmCorePlugin/lib/jquery-ui/js/i18n/jquery.ui.datepicker-%s.js', $culture);
            $javascripts[] = sprintf('/dmDateTimePickerPlugin/js/i18n/jquery.ui.timepicker-%s.js', $culture);
        }        
        $javascripts[] = '/dmDateTimePickerPlugin/js/dmDateTimePickerPlugin.js';
        return $javascripts;
        
    }
    
    public function getStylesheets() {
        // TODO - Fix diem to properly include stylesheets from the widgets        
        dmContext::getInstance()->getResponse()->addStylesheet('/dmCorePlugin/lib/jquery-ui/css/jquery-ui-datepicker.css'); 
        dmContext::getInstance()->getResponse()->addStylesheet('/dmCorePlugin/lib/jquery-ui/css/jquery-ui-slider.css'); 
        dmContext::getInstance()->getResponse()->addStylesheet('/dmDateTimePickerPlugin/css/jquery-ui-timepicker-addon.css');
        dmContext::getInstance()->getResponse()->addStylesheet('/dmDateTimePickerPlugin/css/dmDateTimePickerPlugin.css');
                
        return parent::getStylesheets();
    }  
}

?>
