# CounterReports

Providing a web interface that allows user can filtering, searching, export JR1 reports. All of JR1 reports data are loaded into database. The app is implemented by Angular 8.2.13. Angular CLI (8.3.19)
## Installing

```
git clone git@github.com:culibraries/counter-reports.git counter-reports

cd counter-reports

npm install

# run at localhost:4200
ng serve -o
```

## Prerequisites

You will need to be the member of group on MyGroup. Contact to LIT CU Libraries or group's admin for more information.

## Build

Docker Build:

Staging
`docker build --build-arg ENV=staging -t culibraries/counter-reports:[version]-staging . && docker push culibraries/counter-reports:[version]-staging`

Production
`docker build --build-arg ENV=production -t culibraries/counter-reports:[version] . && docker push culibraries/counter-reports:[version]`
## License

Libraries IT - University Of Colorado - Boulder
