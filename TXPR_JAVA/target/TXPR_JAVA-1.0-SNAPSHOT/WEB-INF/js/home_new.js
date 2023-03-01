// Достаем мои отклики
// function get_all_my_otkliks() {
//     $(".offers_info").css({'overflow': 'auto'})
//
//     $.ajax({
//         type: "GET",
//         url: "get_all_my_otkliks",
//         contentType: "application/json; charset=utf-8",
//
//         success: function(dict_with_all_responsed_orders)
//         {
//             first_request_all_my_otkliks = false;
//             all_my_otkliks = dict_with_all_responsed_orders
//
//             $('#nav-tabContent').empty()
//             $('#nav-tabContent').append(`
//                 <div class="tab-pane fade active show" id="nav-contact" aria-labelledby="without_responce">
//                     <table class="table table-dark table-hover" id="myOtklikiTable">
//                     </table>
//                 </div>`)
//
//             $( "#myOtklikiTable").empty()
//
//             $( "#myOtklikiTable").append(`
//                      <thead>
//                           <tr>
//                             <th scope="col">Тип</th>
//                             <th scope="col">Юзер</th>
//                             <th scope="col">Откуда</th>
//                             <th scope="col">Куда</th>
//                             <th scope="col">Время</th>
//                             <th scope="col">Товар</th>
//                             <th scope="col">Цена</th>
//                           </tr>
//                      </thead>
//                      <tbody id="myOtklikiTbody"></tbody>`)
//
//             if(Object.keys(dict_with_all_responsed_orders).length > 0)
//             {
//                 for (let key in dict_with_all_responsed_orders)
//                 {
//                     if(dict_with_all_responsed_orders[key][8] === 'get')
//                     {
//                         dict_with_all_responsed_orders[key][8] = 'Ищу доставщика'
//                     }
//                     else
//                     {
//                         dict_with_all_responsed_orders[key][8] = 'Ищу заказчика'
//                     }
//
//                     let whose_order = dict_with_all_responsed_orders[key][9]
//
//                     $( "#myOtklikiTbody").append(
//                         `<tr class="myOtklikiRow" value="whose_order_${whose_order}">
//                         <td>${dict_with_all_responsed_orders[key][8]}</td>
//                         <td>${dict_with_all_responsed_orders[key][1]}</td>
//                         <td>${dict_with_all_responsed_orders[key][2]}</td>
//                         <td>${dict_with_all_responsed_orders[key][3]}</td>
//                         <td>${dict_with_all_responsed_orders[key][4]}</td>
//                         <td>${dict_with_all_responsed_orders[key][5]}</td>
//                         <td>${dict_with_all_responsed_orders[key][6]}</td>
//                         <td class="emptyComment" style="display: none">${dict_with_all_responsed_orders[key][7]}</td>
//                         <td class="emptyOrderId" style="display: none">${dict_with_all_responsed_orders[key][0]}</td>
//                     </tr>
//                     `)
//                 }
//             } else {
//                 $('#myOtklikiTbody').append(
//                     `<tr>
//                     <td colspan='7'>Откликов пока нет</td>
//                 </tr>`)
//             }
//
//         }
//     })
// }

// Достаем опубликованное
function getPublished() {
    $.ajax({
        type: "GET",
        url: "/order/get-published",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (publishedOrders) {

            if(publishedOrders.length > 0) {

                $("#published_table").empty()
                let colorTablerow, orderGetOrDeliver,lookCustomerOrContractor

                publishedOrders.forEach(function (order){

                    if (order["orderGetOrDeliver"] === "get") {
                        lookCustomerOrContractor = 'Ищу доставщика'
                        // colorTablerow = '#ebfcff'
                        orderGetOrDeliver = 'get'
                    } else {
                        lookCustomerOrContractor = 'Ищу заказчика'
                        // colorTablerow = '#ebffec'
                        orderGetOrDeliver = 'deliver'
                    }

                    let orderId = order["id"]

                    $("#published_table").append(
                    `<tr class="publishedRow">
                        <td id="myPublished_${orderId}" value="${orderGetOrDeliver}">${lookCustomerOrContractor}</td>
                        <td>${order["orderFromCity"]}</td>
                        <td>${order["orderToCity"]}</td>
                        <td>${order["orderTime"]}</td>
                        <td>${order["orderGoods"]}</td>
                        <td>${order["orderPrice"]}</td>
                    </tr>`)
                    })
            }

            //         // После добавления строки, добавляем id заказа в список
            //         arr_with_published_id.push(order_id)
            //     }
            //
            //     // Получаем список всех id заказов из бд, получивших отклик
            //     let order_id_otklik_arr = Object.keys(dict_order_id_otklik_count)
            //
            //     // Для каждого id заказа на странице проверяем есть ли он в списке откликов
            //     for(order_id of arr_with_published_id)
            //     {
            //         let order_id_toString = order_id.toString()
            //
            //         // Первая ячейка строки таблицы
            //         let order_obj = $(`#myPublished_${order_id_toString}`)
            //         let text_get_or_deliver = order_obj.attr('value')
            //         let notifications_count = dict_order_id_otklik_count[order_id]
            //
            //         let first_col_subscr = "Ищу заказчика"
            //         if(text_get_or_deliver === "get")
            //             first_col_subscr = "Ищу доставщика"
            //
            //         // Добавляем кнопку просмотра откликов
            //         order_obj.empty()
            //         order_obj.css({'padding': '0', 'vertical-align': 'middle'})
            //         order_obj.append(
            //             `<button type="button" id="order_${order_id_toString}" class="btn btn-primary position-relative mbutton2" style='background: #1c0047; width: 100%; height: 100%' onclick="get_list_people_who_responsed(${order_id}, '${text_get_or_deliver}')">
            //             ${first_col_subscr}
            //         </button>`)
            //
            //         // Добавляем иконку новых уведомлений если они есть
            //         if(order_id_otklik_arr.includes(order_id_toString))
            //         {
            //             $(`#order_${order_id_toString}`).append(
            //                 `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="right: 0.2rem; top:0.3rem; font-size: 0.9rem; min-width:1.5rem; min-height:1.3rem">
            //                 ${notifications_count}
            //             </span>`)
            //         }
            //     }
            // }
            // else {
            //     $('#published_table').append(`
            //         <tr><td colspan='6'>Заказов пока нет</td></tr>
            //     `)
            // }
        }
    })
}

//         success: function(dict_to_send)
//         {
//             let dict_with_all_my_offers = dict_to_send['dict_with_all_my_offers']
//             let dict_order_id_otklik_count = dict_to_send['dict_order_id_otklik_count']
//             let dict_with_all_my_otkliks = dict_to_send['dict_with_all_my_otkliks']
//             count_new_otkliks = dict_to_send['count_new_otkliks']
//
//             if(!first_request_all_my_orders)
//             {
//                 $('#nav-tabContent').empty()
//                 $('#nav-tabContent').append(`
//                     <div class="tab-pane fade active show" id="nav-contact" aria-labelledby="without_responce">
//                         <table class="table table-dark table-hover" id="publishedTable">
//                             <thead>
//                                 <tr>
//                                     <th scope="col">Тип</th>
//                                     <th scope="col">Откуда</th>
//                                     <th scope="col">Куда</th>
//                                     <th scope="col">Время</th>
//                                     <th scope="col">Товар</th>
//                                     <th scope="col">Цена</th>
//                                 </tr>
//                             </thead>
//                             <tbody id="published_table">
//                             </tbody>
//                         </table>
//                     </div>`)
//             }
//             first_request_all_my_orders = false
//
//             if(count_new_otkliks > 0)
//             {
//                 we_have_unread_messages = true
//                 $("#without_responce").append(
//                     `<span id="commonNotificationIcon" class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style="font-size: 0.9rem; right: 0.6rem; min-width:1.5rem; min-height:1.3rem">
//                         ${count_new_otkliks}
//                     </span>`)
//             }
//
//             if(Object.keys(dict_with_all_my_offers).length > 0)
//             {
//                 let color_tablerow;
//                 let get_or_deliver;
//
//                 // Заполняем таблицу всеми моими оставленными заказами
//                 for (let key in dict_with_all_my_offers)
//                 {
//                     if(dict_with_all_my_offers[key][7] === 'get')
//                     {
//                         dict_with_all_my_offers[key][7] = 'Ищу доставщика'
//                         color_tablerow = '#ebfcff'
//                         get_or_deliver = 'get'
//                     }
//                     else
//                     {
//                         dict_with_all_my_offers[key][7] = 'Ищу заказчика'
//                         color_tablerow = '#ebffec'
//                         get_or_deliver = 'deliver'
//                     }
//
//                     let order_id = dict_with_all_my_offers[key][5]
//
//                     $( "#published_table").append(
//                         `<tr class="publishedRow">
//                         <td id="myPublished_${order_id}" value="${get_or_deliver}">${dict_with_all_my_offers[key][7]}</td>
//                         <td>${dict_with_all_my_offers[key][0]}</td>
//                         <td>${dict_with_all_my_offers[key][1]}</td>
//                         <td>${dict_with_all_my_offers[key][2]}</td>
//                         <td>${dict_with_all_my_offers[key][3]}</td>
//                         <td>${dict_with_all_my_offers[key][4]}</td>
//                         <td class="emptyComment" style="display: none">${dict_with_all_my_offers[key][6]}</td>
//                         <td class="emptyOrderId" style="display: none">${order_id}</td>
//                     </tr>`)
//
//                     // После добавления строки, добавляем id заказа в список
//                     arr_with_published_id.push(order_id)
//                 }
//
//                 // Получаем список всех id заказов из бд, получивших отклик
//                 let order_id_otklik_arr = Object.keys(dict_order_id_otklik_count)
//
//                 // Для каждого id заказа на странице проверяем есть ли он в списке откликов
//                 for(order_id of arr_with_published_id)
//                 {
//                     let order_id_toString = order_id.toString()
//
//                     // Первая ячейка строки таблицы
//                     let order_obj = $(`#myPublished_${order_id_toString}`)
//                     let text_get_or_deliver = order_obj.attr('value')
//                     let notifications_count = dict_order_id_otklik_count[order_id]
//
//                     let first_col_subscr = "Ищу заказчика"
//                     if(text_get_or_deliver === "get")
//                         first_col_subscr = "Ищу доставщика"
//
//                     // Добавляем кнопку просмотра откликов
//                     order_obj.empty()
//                     order_obj.css({'padding': '0', 'vertical-align': 'middle'})
//                     order_obj.append(
//                         `<button type="button" id="order_${order_id_toString}" class="btn btn-primary position-relative mbutton2" style='background: #1c0047; width: 100%; height: 100%' onclick="get_list_people_who_responsed(${order_id}, '${text_get_or_deliver}')">
//                         ${first_col_subscr}
//                     </button>`)
//
//                     // Добавляем иконку новых уведомлений если они есть
//                     if(order_id_otklik_arr.includes(order_id_toString))
//                     {
//                         $(`#order_${order_id_toString}`).append(
//                             `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="right: 0.2rem; top:0.3rem; font-size: 0.9rem; min-width:1.5rem; min-height:1.3rem">
//                             ${notifications_count}
//                         </span>`)
//                     }
//                 }
//             }
//             else
//             {
//                 $('#published_table').append(`
//                     <tr><td colspan='6'>Заказов пока нет</td></tr>
//                 `)
//             }
//         },
//     });
// }
