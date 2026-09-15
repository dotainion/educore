import { Navigate, Route } from "react-router-dom";
import { Activities } from "./pages/activities/Activities";
import { ViewActivity } from "./pages/activities/ViewActivity";
import { EditActivity } from "./pages/activities/EditActivity";
import { Companies } from "./pages/companies/Companies";
import { ViewCompany } from "./pages/companies/ViewCompany";
import { EditCompany } from "./pages/companies/EditCompany";
import { Contacts } from "./pages/contacts/Contacts";
import { ViewContact } from "./pages/contacts/ViewContact";
import { EditContact } from "./pages/contacts/EditContact";
import { Deals } from "./pages/deals/Deals";
import { ViewDeal } from "./pages/deals/ViewDeal";
import { EditDeal } from "./pages/deals/EditDeal";
import { Leads } from "./pages/leads/Leads";
import { ViewLead } from "./pages/leads/ViewLead";
import { LeadsReport } from "./pages/Reports/LeadsReport";
import { SalesReport } from "./pages/Reports/SalesReport";
import { CRMSettings } from "./pages/settings/CRMSettings";
import { Roles } from "./pages/settings/Roles";
import { Dashboard } from "./pages/Dashboard";
import { Layout } from "./layouts/Layout";
import { EditLead } from "./pages/leads/EditLead";
import { ApiProvider } from "../../global/context/ApiProvider";
import { AuthProvider } from "../../global/context/AuthProvider";
import { routes } from "../../global/routes/Routes";
import { RoutesProvider } from "../../global/providers/RoutesProvider";

export const App = () =>{
    return (
        <RoutesProvider>
            <Route element={<Layout />} >
                <Route>
                    <Route path={routes.crm.activity.list} element={<Activities />} />
                    <Route path={routes.crm.activity.create} element={<EditActivity />} />
                    <Route path={routes.crm.activity.view()} element={<ViewActivity />} />
                    <Route path={routes.crm.activity.update()} element={<EditActivity />} />
                </Route>
                <Route>
                    <Route path={routes.crm.company.list} element={<Companies />} />
                    <Route path={routes.crm.company.create} element={<EditCompany />} />
                    <Route path={routes.crm.company.view()} element={<ViewCompany />} />
                    <Route path={routes.crm.company.update()} element={<EditCompany />} />
                </Route>
                <Route>
                    <Route path={routes.crm.contact.list} element={<Contacts />} />
                    <Route path={routes.crm.contact.create} element={<EditContact />} />
                    <Route path={routes.crm.contact.view()} element={<ViewContact />} />
                    <Route path={routes.crm.contact.update()} element={<EditContact />} />
                </Route>
                <Route>
                    <Route path={routes.crm.deal.list} element={<Deals />} />
                    <Route path={routes.crm.deal.create} element={<EditDeal />} />
                    <Route path={routes.crm.deal.view()} element={<ViewDeal />} />
                    <Route path={routes.crm.deal.update()} element={<EditDeal />} />
                </Route>
                <Route>
                    <Route path={routes.crm.lead.list} element={<Leads />} />
                    <Route path={routes.crm.lead.create} element={<EditLead />} />
                    <Route path={routes.crm.lead.view()} element={<ViewLead />} />
                    <Route path={routes.crm.lead.update()} element={<EditLead />} />
                </Route>
                <Route>
                    <Route path={routes.crm.leadsReport} element={<LeadsReport />} />
                    <Route path={routes.crm.salesReport} element={<SalesReport />} />
                </Route>
                <Route>
                    <Route path={routes.crm.crmSettings} element={<CRMSettings />} />
                    <Route path={routes.crm.roles} element={<Roles />} />
                </Route>
                <Route path={routes.crm.dashboard} element={<Dashboard />} />
            </Route>
            <Route path={routes.default} element={<Navigate to={routes.crm.dashboard} />} />
            <Route path={'*'} element={<NotFound />} />
        </RoutesProvider>
    )
}
