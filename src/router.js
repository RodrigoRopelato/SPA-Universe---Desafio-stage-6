export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()

        window.history.pushState({},"",event.target.href)
        
        this.handle()
    }

    handle() {
        const {pathname} = window.location
        const route = this.routes[pathname] || this.routes[404]

        fetch(route).then(data=> data.text()).then(html =>{
            document.querySelector('#app').innerHTML = html

            if(pathname.replace(/\//g, '') === ''){
                pathname = 'home'
            }
            else if(route === '/pages/404.html'){
                document.querySelector('#home').id = 'explore'
            }
            document.querySelector('#home').id = pathname.replace(/\//g, '')
        })

        console.log(pathname)
        console.log(route)
    }
}