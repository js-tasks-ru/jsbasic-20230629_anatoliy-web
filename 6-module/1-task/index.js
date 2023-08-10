import createElement from '../../assets/lib/create-element.js';



/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */


export default class UserTable {
  elem = null
  constructor(rows) {
    this.rows = rows
    this.elem = this.#render()
  }
  #template() {
    return `
        <table>
          <thead>
              <tr>
                  <th>Имя</th>
                  <th>Возраст</th>
                  <th>Зарплата</th>
                  <th>Город</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
            ${

             this.rows.map((row) => {
               return `
                 <tr>
                    <td>${row.name}</td>
                    <td>${row.age}</td>
                    <td>${row.salary}</td>
                    <td>${row.city}</td>
                    <td><button>X</button></td>
                  </tr>`
                      }).join('\n')
                    }


          </tbody>
    </table>`


  }
  #render() {
    this.elem = createElement(this.#template());
    console.log('template', this.elem)
    this.elem.addEventListener( 'click', this.#deleteRow)

    return this.elem
  }

  #deleteRow = () =>{
    let button = this.elem    .querySelector('button');
    button.closest('tr').remove();
  }

}

