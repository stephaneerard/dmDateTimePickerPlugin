function initializeSfWidgetFormDatePicker($context) {
    var $widgets = null;
    if ($context != undefined) $widgets = $($context.find('.sfWidgetFormDatePicker'));
    else $widgets = $('.sfWidgetFormDatePicker');
    $.each($widgets, function(){
        var initialValue = '';        
        var $selects = $(this).find('select');
        
        var $input = $(this).find('input.inputField').datepicker({
            showButtonPanel: true
        }).bind('change.dmDatePicker', function(){
            var date = $(this).datepicker("getDate");
            if (date != null) {
                $selects.filter('select[name$="[day]"]').val(date.getDate());
                $selects.filter('select[name$="[month]"]').val(date.getMonth()+1);
                $selects.filter('select[name$="[year]"]').val(date.getFullYear()).trigger('change'); 
            } else $selects.val('');
            if ($input.val() != initialValue) $(this).closest('.sf_admin_form_row').addClass('dm_row_modified');
            else $(this).closest('.sf_admin_form_row').removeClass('dm_row_modified');
        }).bind('blur.dmDatePicker', function(){
            $input.change();
        });
        
        $(this).find('.button-show-picker').click(function(){
            $input.datepicker('show');
        });
        
        $(this).find('.button-reset-picker').click(function(){
            $input.datepicker('setDate',null).val('').change();
            $input.datepicker('hide');
        });        
        
        if ($selects.filter('select[name$="[day]"]').val() != '') { 
            $input.datepicker('setDate', 
                new Date(
                    $selects.filter('select[name$="[year]"]').val(),
                    $selects.filter('select[name$="[month]"]').val()-1,
                    $selects.filter('select[name$="[day]"]').val()
                )
            );
            initialValue = $input.val();
        };
    });    
}; 

$(document).ready(function(){
    initializeSfWidgetFormDatePicker($(this)); 
});
(function($) {
    $('#dm_page div.dm_widget').bind('dmWidgetLaunch', function() {
        initializeSfWidgetFormDatePicker($(this));        
    });
})(jQuery);
(function($) {
    $('div.dm.dm_widget_edit_dialog_wrap').live('dmAjaxResponse', function() {
        initializeSfWidgetFormDatePicker($(this));        
    });
})(jQuery);