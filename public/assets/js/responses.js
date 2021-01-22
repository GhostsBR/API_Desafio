$(document).ready(function() {
    $(this).on("click", ".addmore", function() {
        let html = `<li>
                    <div class="row" style="margin-left: 3px; margin-right: 3px;" id="append">
                        <div class="form-group">
                            <label for="responses">Resposta</label>
                            <input type="text" name="responses" class="form-control" id="responses" value="A" required>
                        </div>
                        <button type="button" class="removemore"><img src="img/less.png" alt="more" height="20px">
                    </div>
                    </li>`
        

        $("#append").append(html);
    });
    
    $(this).on("click", ".removemore", function() {
        let target_input = $(this).parent();
        let target_input2 = $(target_input).parent();
        target_input2.remove();
    });
})

$(document).ready(function() {
    $(this).on("click", ".addmore2", function() {
        let html = `<li><div class="row" style="margin-left: 3px; margin-right: 3px;" id="append2"><div class="form-group"><label for="responses">Resposta</label><input type="text" name="responses" class="form-control" id="responses" value="A" required></div><div class="form-group" style="margin-left: 5px;"><label for="weights">Peso</label><input type="number" name="weights" class="form-control" id="weights" value="1" min="1" max="100" required></div><button type="button" class="removemore2"><img src="img/less.png" alt="more" height="20px"></div></li>`
        

        $("#append2").append(html);
    });

    $(this).on("click", ".removemore2", function() {
        let target_input = $(this).parent();
        let target_input2 = $(target_input).parent();
        target_input2.remove();
    });
})