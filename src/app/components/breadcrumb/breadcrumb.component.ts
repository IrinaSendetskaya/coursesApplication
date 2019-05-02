import { Component, OnInit } from "@angular/core";
import { filter, distinctUntilChanged } from "rxjs/operators";
import { Router, NavigationEnd, ActivatedRoute, Event } from "@angular/router";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.css"]
})
export class BreadcrumbComponent implements OnInit {
  public finalBreadcrumbs: IBreadCrumb[];

  constructor(private _router: Router, private activatedRoute: ActivatedRoute) {
    this.finalBreadcrumbs = this.buildBreadCrumb(this.activatedRoute);
  }

  ngOnInit() {
    this._router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.finalBreadcrumbs = this.buildBreadCrumb(this.activatedRoute);
      });
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = "",
    breadcrumbs: IBreadCrumb[] = []
  ): IBreadCrumb[] {
    var newBreadcrumbs: IBreadCrumb[] = [];
    let label = this.defineLabelRoute(route);
    let path = this.definePathRoute(route);
    const routeParts = path.split("/");
    const lastRoutePart = path.split("/").pop();

    if (
      (lastRoutePart.startsWith(":") && !!route.snapshot) ||
      routeParts.length > 1
    ) {
      newBreadcrumbs = this.findLabelIFDynamicPathAndReturnBreadcrumb(
        lastRoutePart,
        label,
        path,
        route,
        url,
        breadcrumbs
      );
    } else {
      var newPath = this.defineNewPathRoute(route);
      if (!label) {
        label = this.defineNewLabelRoute(route);
      }
      var nextUrl = newPath ? `${url}/${newPath}` : url;
      newBreadcrumbs = this.fillBreadcrumbs(label, nextUrl, newBreadcrumbs);
    }
    return route.firstChild
      ? this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs)
      : newBreadcrumbs;
  }

  defineLabelRoute(route: ActivatedRoute): string {
    return route.routeConfig && route.routeConfig.data
      ? route.routeConfig.data.breadcrumb
      : "";
  }

  defineNewLabelRoute(route: ActivatedRoute): string {
    return route.snapshot.children &&
      route.snapshot.children.pop() &&
      route.snapshot.children.pop().data
      ? route.snapshot.children.pop().data.breadcrumb
      : "";
  }
  defineNewPathRoute(route: ActivatedRoute): string {
    return route.snapshot.children &&
      route.snapshot.children.pop() &&
      route.snapshot.children.pop().url
      ? route.snapshot.children.pop().url[0].path
      : "";
  }
  definePathRoute(route: ActivatedRoute): string {
    return route.routeConfig && route.routeConfig.data
      ? route.routeConfig.path
      : "";
  }
  fillBreadcrumbs(
    label: string,
    nextUrl: string,
    breadcrumbs: IBreadCrumb[]
  ): IBreadCrumb[] {
    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl
    };
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    return newBreadcrumbs;
  }

  findLabelIFDynamicPathAndReturnBreadcrumb(
    lastRoutePart: string,
    label: string,
    path: string,
    route: ActivatedRoute,
    url: string,
    breadcrumbs: IBreadCrumb[]
  ): IBreadCrumb[] {
    var paramName = lastRoutePart;
    if (lastRoutePart.startsWith(":")) {
      paramName = lastRoutePart.substr(1);
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = "Курс " + route.snapshot.params[paramName];
    } else {
      label = "Курс " + paramName;
    }
    var nextUrl = path ? `/${path}` : url;
    return this.fillBreadcrumbs(label, nextUrl, breadcrumbs);
  }
}
export interface IBreadCrumb {
  label: string;
  url: string;
}
