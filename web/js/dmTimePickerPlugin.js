function initializeSfWidgetFormTimePicker($context) {
    var $widgets = null;
    if ($context != undefined) $widgets = $($context.find('.sfWidgetFormTimePicker'));
    else $widgets = $('.sfWidgetFormTimePicker');
    $.each($widgets, function(){
        var initialValue = '';        
        var $selects = $(this).find('select');
        var $input = $(this).find('input.inputField').datetimepicker({
            timeOnly: true            
        }).change(function(){
            var date = $input.datetimepicker("getDate");            
            if (date != null) {                
                $selects.filter('select[name$="[hour]"]').val(date.getHours());
                $selects.filter('select[name$="[minute]"]').val(date.getMinutes());                
            } else $selects.val('');
            if ($input.val() != initialValue) $(this).closest('.sf_admin_form_row').addClass('dm_row_modified');
            else $(this).closest('.sf_admin_form_row').removeClass('dm_row_modified');
            
        }).blur(function(){
            $input.change();
        });        
        $(this).find('.button-show-picker').click(function(){
            $input.datetimepicker('show');
        });
        $(this).find('.button-reset-picker').click(function(){
            $input.datetimepicker('setDate',null).val('').change();
            $input.datetimepicker('hide');
        });        
        if ($selects.filter('select[name$="[hour]"]').val() != '') {
            var date = new Date();
            date.setHours(
                    $selects.filter('select[name$="[hour]"]').val(),
                    $selects.filter('select[name$="[minute]"]').val()
                );
            $input.datetimepicker('setDate', date);
            initialValue = $input.val();
            $input.change();
        };
    });    
};

$(document).ready(function(){
    var $check = $('#dm_admin_content');
    if ($check.length >0) initializeSfWidgetFormTimePicker($(this)); 
});
(function($) {
    $('#dm_page div.dm_widget').bind('dmWidgetLaunch', function() {
        initializeSfWidgetFormTimePicker($(this));        
    });
})(jQuery);
(function($) {
    $('div.dm.dm_widget_edit_dialog_wrap').live('dmAjaxResponse', function() {
        initializeSfWidgetFormTimePicker($(this));        
    });
})(jQuery);