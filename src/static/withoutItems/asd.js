import VueRouter from 'vue-router'
import HomePage from '../components/HomePage'
import CareCenter from '../components/CareCenter'
import CooperationMode from '../components/CooperationMode'
import OperationCommonSense from '../components/OperationCommonSense'
import ProductionCenter from '../components/ProductionCenter'
import SolutionCase from '../components/SolutionCase'
import AboutUs from '../components/AboutUs'
import CompanyProfile from '../pages/aboutus/CompanyProfile'
import OurAdvantage from '../pages/aboutus/OurAdvantage'
import ContactUs from '../pages/aboutus/ContactUs'
import FirmNew from '../pages/carecenter/FirmNew'
import IndustryInformation from '../pages/carecenter/IndustryInformation'
import DirectSales from '../pages/cooperationmode/DirectSales'
import ChannelsCooperation from '../pages/cooperationmode/ChannelsCooperation'
import OEMCooperation from '../pages/cooperationmode/OEMCooperation'
import EveryoneAttention from '../pages/operationcommonsecnse/EveryoneAttention'
import PolicyAssembly from '../pages/operationcommonsecnse/PolicyAssembly'
import OperationPlan from '../pages/operationcommonsecnse/OperationPlan'
import FormsAndOpportunities from '../pages/operationcommonsecnse/FormsAndOpportunities'
import ModelOperation from '../pages/operationcommonsecnse/ModelOperation'
import PlatformOptimization from '../pages/operationcommonsecnse/PlatformOptimization'
import ResourceIntegration from '../pages/operationcommonsecnse/ResourceIntegration'
import OldmanMembers from '../pages/operationcommonsecnse/OldmanMembers'
import MarketPromotion from '../pages/operationcommonsecnse/MarketPromotion'
import SalesDerivatives from '../pages/operationcommonsecnse/SalesDerivatives'
import ReferenceData from '../pages/operationcommonsecnse/ReferenceData'
import PreparationRoom from '../pages/operationcommonsecnse/PreparationRoom'
import PlatForm from '../pages/productioncenter/PlatForm'
import NursingEquipment from '../pages/productioncenter/NursingEquipment'
import HomeCareScheme from '../pages/solutioncase/HomeCareScheme'
import CommunityPensionScheme from '../pages/solutioncase/CommunityPensionScheme'
import InstitutionalPensionScheme from '../pages/solutioncase/InstitutionalPensionScheme'
import EndowmentRealEstateScheme from '../pages/solutioncase/EndowmentRealEstateScheme'
import PensionSystemManagementPlan from '../pages/solutioncase/PensionSystemManagementPlan'
import IndoorPosition from '../pages/solutioncase/IndoorPosition'
import PensionRegulation from '../pages/solutioncase/PensionRegulation'
import PropertyElderlyService from '../pages/solutioncase/PropertyElderlyService'
import FamilyBeds from '../pages/solutioncase/FamilyBeds'
import AgingModification from '../pages/solutioncase/AgingModification'
import MedicalAndEndowment from '../pages/solutioncase/MedicalAndEndowment'
import HealthManagement from '../pages/solutioncase/HealthManagement'



export default new VueRouter({
    routes: [
        {
            path: '/homepage',
            component: HomePage,
            name: 'HomePage'
        },
        {
            path: '/aboutus',
            component: AboutUs,
            name: 'AboutUs',
            redirect: '/CompanyProfile',
            children: [
                {
                    path: '/CompanyProfile',
                    component: CompanyProfile,
                    name: 'CompanyProfile'
                },
                {
                    path: '/aboutus/OurAdvantage',
                    component: OurAdvantage,
                    name: 'OurAdvantage'
                },
                {
                    path: '/aboutus/ContactUs',
                    component: ContactUs,
                    name: 'ContactUs'
                }
            ]
        },
        {
            path: '/carecenter',
            component: CareCenter,
            name: 'CareCenter',
            redirect: "/FirmNew",
            children: [
                {
                    path: '/FirmNew',
                    component: FirmNew,
                    name: 'FirmNew'
                },
                {
                    path: '/carecenter/IndustryInformation',
                    component: IndustryInformation,
                    name: 'IndustryInformation'
                }
            ]
        },
        {
            path: '/cooperationmode',
            component: CooperationMode,
            name: 'CooperationMode',
            redirect: '/DirectSales',
            children: [
                {
                    path: '/DirectSales',
                    component: DirectSales,
                    name: 'DirectSales'
                },
                {
                    path: '/cooperationmode/ChannelsCooperation',
                    component: ChannelsCooperation,
                    name: 'ChannelsCooperation'
                },
                {
                    path: '/cooperationmode/OEMCooperation',
                    component: OEMCooperation,
                    name: 'OEMCooperation'
                }
            ]
        },
        {
            path: '/operationcommonSense',
            component: OperationCommonSense,
            name: 'OperationCommonSense',
            redirect: '/EveryoneAttention',
            children: [
                {
                    path: '/EveryoneAttention',
                    component: EveryoneAttention,
                    name: 'EveryoneAttention'
                },
                {
                    path: '/operationcommonSense/PolicyAssembly',
                    component: PolicyAssembly,
                    name: 'PolicyAssembly'
                },
                {
                    path: '/operationcommonSense/OperationPlan',
                    component: OperationPlan,
                    name: 'OperationPlan'
                },
                {
                    path: '/operationcommonSense/FormsAndOpportunities',
                    component: FormsAndOpportunities,
                    name: 'FormsAndOpportunities'
                },
                {
                    path: '/operationcommonSense/ModelOperation',
                    component: ModelOperation,
                    name: 'ModelOperation'
                },
                {
                    path: '/operationcommonSense/PlatformOptimization',
                    component: PlatformOptimization,
                    name: 'PlatformOptimization'
                },
                {
                    path: '/operationcommonSense/ResourceIntegration',
                    component: ResourceIntegration,
                    name: 'ResourceIntegration'
                },
                {
                    psth: '/operationcommonSense/OldmanMembers',
                    component: OldmanMembers,
                    name: 'OldmanMembers'
                },
                {
                    path: '/operationcommonSense/MarketPromotion',
                    component: MarketPromotion,
                    name: 'MarketPromotion'
                },
                {
                    path: '/operationcommonSense/SalesDerivatives',
                    component: SalesDerivatives,
                    name: 'SalesDerivatives'
                },
                {
                    path: '/operationcommonSense/ReferenceData',
                    component: ReferenceData,
                    name: 'ReferenceData'
                },
                {
                    path: '/operationcommonSense/PreparationRoom',
                    component: PreparationRoom,
                    name: 'PreparationRoom'
                }
            ]
        },
        {
            path: '/productioncenter',
            component: ProductionCenter,
            name: 'ProductionCenter',
            redirect: '/PlatForm',
            children: [
                {
                    path: '/PlatForm',
                    component: PlatForm,
                    nmae: 'PlatForm'
                },
                {
                    path: '/productioncenter/NursingEquipment',
                    component: NursingEquipment,
                    nmae: 'NursingEquipment'
                }
            ]
        },
        {
            path: '/solutioncase',
            component: SolutionCase,
            name: 'SolutionCase',
            redirect: '/HomeCareScheme',
            children: [
                {
                    path: '/HomeCareScheme',
                    component: HomeCareScheme,
                    name: 'HomeCareScheme'
                },
                {
                    path: '/solutioncase/CommunityPensionScheme',
                    component: CommunityPensionScheme,
                    name: 'CommunityPensionScheme'
                },
                {
                    psth: '/solutioncase/InstitutionalPensionScheme',
                    component: InstitutionalPensionScheme,
                    name: 'InstitutionalPensionScheme'
                },
                {
                    path: '/solutioncase/EndowmentRealEstateScheme',
                    component: EndowmentRealEstateScheme,
                    name: 'EndowmentRealEstateScheme'
                },
                {
                    path: '/solutioncase/PensionSystemManagementPlan',
                    component: PensionSystemManagementPlan,
                    name: 'PensionSystemManagementPlan'
                },
                {
                    path: '/solutioncase/IndoorPosition',
                    component: IndoorPosition,
                    name: 'IndoorPosition'
                },
                {
                    path: '/solutioncase/PensionRegulation',
                    component: PensionRegulation,
                    name: 'PensionRegulation'
                },
                {
                    path: '/solutioncase/PropertyElderlyService',
                    component: PropertyElderlyService,
                    name: 'PropertyElderlyService'
                },
                {
                    path: '/solutioncase/FamilyBeds',
                    component: FamilyBeds,
                    name: 'FamilyBeds'
                },
                {
                    path: '/solutioncase/AgingModification',
                    component: AgingModification,
                    name: 'AgingModification'
                },
                {
                    path: '/solutioncase/MedicalAndEndowment',
                    component: MedicalAndEndowment,
                    name: 'MedicalAndEndowment'
                },
                {
                    path: '/solutioncase/HealthManagement',
                    component: HealthManagement,
                    name: 'HealthManagement'
                }
            ]
        }
    ]
})