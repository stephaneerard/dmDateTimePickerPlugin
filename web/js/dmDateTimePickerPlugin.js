$(document).ready(function(){
    $.each($('.sfWidgetFormDateTimePicker'), function(){
        // This is Admin UI support
        var initialValue = '';
        
        var $selects = $(this).find('select');
        // TODO add localization support
        // TODO add format support
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
            
            // This is Admin UI support
            if ($input.val() != initialValue) $(this).closest('.sf_admin_form_row').addClass('dm_row_modified');
            else $(this).closest('.sf_admin_form_row').removeClass('dm_row_modified');            
        }).blur(function(){
            // This is some interesting jquery ui bug that is solved like this, and results are as I want them to be
            $input.change();
        });        
        $(this).find('.button-show-picker').click(function(){
            $input.datetimepicker('show');
        });
        $(this).find('.button-reset-picker').click(function(){
            $input.datetimepicker('setDate',null).val('').change();
            $input.datetimepicker('hide');
        });        
        // Read initial date
        if ($selects.filter('select[name$="[hour]"]').val() != '') { // One is just enough to see there is a date set
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
    
});