function initializeSfWidgetFormDateTimePicker($context) {
    var $widgets = null;
    if ($context != undefined) $widgets = $($context.find('.sfWidgetFormDateTimePicker'));
    else $widgets = $('.sfWidgetFormDateTimePicker');
    $.each($widgets, function(){
        var initialValue = '';        
        var $selects = $(this).find('select');
        var $input = $(this).find('input.inputField').datetimepicker({
            timeOnly: false            
        }).change(function(){
            var date = $input.datetimepicker("getDate");            
            if (date != null) {    
                $selects.filter('select[name$="[day]"]').val(date.getDate());
                $selects.filter('select[name$="[month]"]').val(date.getMonth()+1);
                $selects.filter('select[name$="[year]"]').val(date.getFullYear());
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
            var date = new Date(                
                $selects.filter('select[name$="[year]"]').val(),
                $selects.filter('select[name$="[month]"]').val()-1,
                $selects.filter('select[name$="[day]"]').val()
                );
            date.setHours(
                $selects.filter('select[name$="[hour]"]').val(),
                $selects.filter('select[name$="[minute]"]').val()
                );
            $input.datetimepicker('setDate', date);
            initialValue = $input.val();
            $input.change();
        };
    });
    // Strange bug :(
    $('#ui-datepicker-div').css('display', 'none');
};

$(document).ready(function(){
    var $check = $('#dm_admin_content');
    if ($check.length >0) initializeSfWidgetFormDateTimePicker($(this)); 
});
(function($) {
    $('#dm_page div.dm_widget').bind('dmWidgetLaunch', function() {
        initializeSfWidgetFormDateTimePicker($(this));        
    });
})(jQuery);
(function($) {
    $('div.dm.dm_widget_edit_dialog_wrap').live('dmAjaxResponse', function() {
        initializeSfWidgetFormDateTimePicker($(this));        
    });
})(jQuery);