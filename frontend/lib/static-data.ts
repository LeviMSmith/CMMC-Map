export interface Revision {
  id: number;
  version: string;
  date_completed?: Date;
}

export interface Control {
  id: number;
  level: number;
  section: string;
  section_name: string;
  brief_description: string;
  assessment_objectives: AssessmentObjectives;
  examine: string;
  interview: string;
  test: string;
  discussion: string;
  further_discussion: string;
  fd_pac: string[];
  fd_examples: FdExamples;
  key_references: string[];
}

export interface AssessmentObjectives {
  a: string;
  b?: string;
  c?: string;
  d?: string;
  e?: string;
  f?: string;
  g?: string;
  h?: string;
  i?: string;
  j?: string;
  k?: string;
  l?: string;
  m?: string;
  n?: string;
  o?: string;
}

export interface FdExamples {
  "Example 1"?: string;
  "Example 2"?: string;
  Example?: string;
}

export interface Section {
  section: string;
  description: string;
  abreviation: string;
}

export const sections: Section[] = [
  {
    section: "3.1",
    description: "Access Control",
    abreviation: "AC",
  },
  {
    section: "3.2",
    description: "Awareness and Training",
    abreviation: "AT",
  },
  {
    section: "3.3",
    description: "Audit and Accountability",
    abreviation: "AU",
  },
  {
    section: "3.4",
    description: "Configuration Management",
    abreviation: "CM",
  },
  {
    section: "3.5",
    description: "Identification and Authentication",
    abreviation: "IA",
  },
  {
    section: "3.6",
    description: "Incident Response",
    abreviation: "IR",
  },
  {
    section: "3.7",
    description: "Maintenence",
    abreviation: "MA",
  },
  {
    section: "3.8",
    description: "Media Protection",
    abreviation: "MP",
  },
  {
    section: "3.9",
    description: "Personnel Security",
    abreviation: "PS",
  },
  {
    section: "3.10",
    description: "Physical Protection",
    abreviation: "PE",
  },
  {
    section: "3.11",
    description: "Risk Assessment",
    abreviation: "RA",
  },
  {
    section: "3.12",
    description: "Security Assessment",
    abreviation: "CA",
  },
  {
    section: "3.13",
    description: "System and Communications Protection",
    abreviation: "SC",
  },
  {
    section: "3.14",
    description: "System and Information Integrity",
    abreviation: "SI",
  },
];

export const controls: Control[] = [
  {
    id: 1,
    level: 1,
    section: "3.1.1",
    section_name: "AUTHORIZED ACCESS CONTROL ",
    brief_description:
      "Limit information system access to authorized users, processes acting on behalf of \nauthorized users, or devices (including other information systems). \n",
    assessment_objectives: {
      a: "authorized users are identified;",
      b: "processes acting on behalf of authorized users are identified;",
      c: "devices (and other systems) authorized to connect to the system are identified;",
      d: "system access is limited to authorized users;",
      e: "system access is limited to processes acting on behalf of authorized users; and",
      f: "system access is limited to authorized devices (including other systems).",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing account management; system \nsecurity plan; system design documentation; system configuration settings and associated \ndocumentation; list of active system accounts and the name of the individual associated with \neach account; notifications or records of recently transferred, separated, or terminated \nemployees; list of conditions for group and role membership; list of recently disabled system \naccounts along with the name of the individual associated with each account; access \nauthorization records; account management compliance reviews; system monitoring \nrecords; system audit logs and records; list of devices and systems authorized to connect to \norganizational systems; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with account management responsibilities; system or network \nadministrators; personnel with information security responsibilities]",
    test: "[SELECT FROM: Organizational processes for managing system accounts; mechanisms for \nimplementing account management]",
    discussion:
      "Access control policies (e.g., identity- or role-based policies, control matrices, and \ncryptography) control access between active entities or subjects (i.e., users or processes \nacting on behalf of users) and passive entities or objects (e.g., devices, files, records, and \ndomains) in systems. Access enforcement mechanisms can be employed at the application \nand service level to provide increased information security. Other systems include systems \ninternal and external to the organization. This requirement focuses on account management \nfor systems and applications. The definition of and enforcement of access authorizations, \nother than those determined by account type (e.g., privileged verses [sic] non-privileged) are \naddressed in requirement 3.1.2 (AC.L1-3.1.2).",
    further_discussion:
      "Identify users, processes, and devices that are allowed to use company computers and can \nlog on to the company network. Automated updates and other automatic processes should \nbe associated with the user who initiated (authorized) the process. Limit the devices (e.g., \nprinters) that can be accessed by company computers. Set up your system so that only \nauthorized users, processes, and devices can access the company network. \nThis practice, AC.L1-3.1.1, controls system access based on user, process, or device \nidentity. AC.L1-3.1.1 leverages IA.L1-3.5.1 which provides a vetted and trusted identity for \naccess control.",
    fd_examples: {
      "Example 1":
        "Your company maintains a list of all personnel authorized to use company information \nsystems [a]. This list is used to support identification and authentication activities conducted \nby IT when authorizing access to systems [a,d].",
      "Example 2":
        "A coworker wants to buy a new multi-function printer/scanner/fax device and make it \navailable on the company network. You explain that the company controls system and device \naccess to the network and will prevent network access by unauthorized systems and devices \n[c]. You help the coworker submit a ticket that asks for the printer to be granted access to \nthe network, and appropriate leadership approves the device [f].",
    },
    fd_pac: [
      "Is a list of authorized users maintained that defines their identities and roles [a]?",
      "Are account requests authorized before system access is granted [d,e,f]?3",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.i",
      "NIST SP 800-171 Rev 2 3.1.1",
    ],
  },
  {
    id: 2,
    level: 1,
    section: "3.1.2",
    section_name: "TRANSACTION & FUNCTION CONTROL ",
    brief_description:
      "Limit information system access to the types of transactions and functions that authorized \nusers are permitted to execute. \n",
    assessment_objectives: {
      a: "the types of transactions and functions that authorized users are permitted to execute \nare defined; and",
      b: "system access is limited to the defined types of transactions and functions for \nauthorized users.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing access enforcement; system \nsecurity plan; system design documentation; list of approved authorizations including \nremote access authorizations; system audit logs and records; system configuration settings \nand associated documentation; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with access enforcement responsibilities; system or network \nadministrators; personnel with information security responsibilities; system developers]",
    test: "[SELECT FROM: Mechanisms implementing access control policy]",
    discussion:
      "Organizations may choose to define access privileges or other attributes by account, by type \nof account, or a combination of both. System account types include individual, shared, group, \nsystem, anonymous, guest, emergency, developer, manufacturer, vendor, and temporary. \nOther attributes required for authorizing access include restrictions on time-of-day, day-of-\nweek, and point-of-origin. In defining other account attributes, organizations consider \nsystem-related requirements (e.g., system upgrades scheduled maintenance,) and mission \nor business requirements, (e.g., time zone differences, customer requirements, remote \naccess to support travel requirements).",
    further_discussion:
      "Limit users to only the information systems, roles, or applications they are permitted to use \nand are needed for their roles and responsibilities. Limit access to applications and data & Function Control \nbased on the authorized users’ roles and responsibilities. Common types of functions a user \ncan be assigned are create, read, update, and delete.",
    fd_examples: {
      Example:
        "You supervise the team that manages DoD contracts for your company. Members of your \nteam need to access the contract information to perform their work properly. Because some \nof that data contains FCI, you work with IT to set up your group’s systems so that users can \nbe assigned access based on their specific roles [a]. Each role limits whether an employee \nhas read-access or create/read/delete/update -access [b]. Implementing this access control \nrestricts access to FCI information unless specifically authorized.",
    },
    fd_pac: [
      "Are access control lists used to limit access to applications and data based on role and/or \nidentity [a]?4",
      "Is access for authorized users restricted to those parts of the system they are explicitly \npermitted to use (e.g., a person who only performs word-processing cannot access \ndeveloper tools) [b]?5",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.ii",
      "NIST SP 800-171 Rev 2 3.1.2",
    ],
  },
  {
    id: 3,
    level: 1,
    section: "3.1.20",
    section_name: "EXTERNAL CONNECTIONS ",
    brief_description:
      "Verify and control/limit connections to and use of external information systems. \n",
    assessment_objectives: {
      a: "connections to external systems are identified;",
      b: "the use of external systems is identified;",
      c: "connections to external systems are verified;",
      d: "the use of external systems is verified;",
      e: "connections to external systems are controlled/limited; and",
      f: "the use of external systems is controlled/limited.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing the use of external systems; \nterms and conditions for external systems; system security plan; list of applications \naccessible from external systems; system configuration settings and associated \ndocumentation; system connection or processing agreements; account management \ndocuments; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for defining terms and conditions for use of \nexternal systems to access organizational systems; system or network administrators; \npersonnel with information security responsibilities]",
    test: "[SELECT FROM: Mechanisms implementing terms and conditions on use of external \nsystems]",
    discussion:
      'External systems are systems or components of systems for which organizations typically \nhave no direct supervision and authority over the application of security requirements and \ncontrols or the determination of the effectiveness of implemented controls on those systems. \nExternal systems include personally owned systems, components, or devices and privately-\nowned computing and communications devices resident in commercial or public facilities. \nThis requirement also addresses the use of external systems for the processing, storage, or \ntransmission of FCI, including accessing cloud services (e.g., infrastructure as a service, \nplatform as a service, or software as a service) from organizational systems. \nOrganizations establish terms and conditions for the use of external systems in accordance \nwith organizational security policies and procedures. Terms and conditions address as a \nminimum, the types of applications that can be accessed on organizational systems from \nexternal systems. If terms and conditions with the owners of external systems cannot be \nestablished, organizations may impose restrictions on organizational personnel using those \nexternal systems. \nThis requirement recognizes that there are circumstances where individuals using external \nsystems (e.g., contractors, coalition partners) need to access organizational systems. In those \nsituations, organizations need confidence that the external systems contain the necessary \ncontrols so as not to compromise, damage, or otherwise harm organizational systems. \nVerification that the required controls have been effectively implemented can be achieved \nby third-party, independent assessments, attestations, or other means, depending on the \nassurance or confidence level required by organizations. \nNote that while “external” typically refers to outside of the organization’s direct supervision \nand authority, that is not always the case. Regarding the protection of FCI across an \norganization, the organization may have systems that process FCI and others that do not. \nAnd among the systems that process FCI there are likely access restrictions for FCI that apply \nbetween systems. Therefore, from the perspective of a given system, other systems within \nthe organization may be considered “external" to that system.',
    further_discussion:
      "Control and manage connections between your company network and outside networks. \nOutside networks could include the public internet, one of your own company’s networks \nthat falls outside of your CMMC Assessment Scope (e.g., an isolated lab), or a network that \ndoes not belong to your company. Tools to accomplish include firewalls and connection \nallow/deny lists. External systems not controlled by your company could be running \napplications that are prohibited or blocked. Control and limit access to corporate networks \nfrom personally owned devices such as laptops, tablets, and phones. You may choose to limit \nhow and when your network is connected to outside systems or only allow certain \nemployees to connect to outside systems from network resources.",
    fd_examples: {
      Example:
        "You and your coworkers are working on a big proposal and will put in extra hours over the \nweekend to get it done. Part of the proposal includes FCI. Because FCI should not be shared \npublicly, you remind your coworkers of the policy requirement to use their company laptops, \nnot personal laptops or tablets, when working on the proposal over the weekend [b,f]. You \nalso remind everyone to work from the cloud environment that is approved for processing \nand storing FCI rather than the other collaborative tools that may be used for other projects \n[b,f].",
    },
    fd_pac: [
      "Are all connections to external systems outside of the assessment scope identified [a]?",
      "Are external systems (e.g., systems managed by contractors, partners, or vendors; \npersonal devices) that are permitted to connect to or make use of organizational systems \nidentified [b]?",
      "Are methods employed to ensure that only authorized connections are being made to \nexternal systems (e.g., requiring log-ins or certificates, access from a specific IP address, \nor access via Virtual Private Network (VPN)) [c,e]?",
      "Are methods employed to confirm that only authorized external systems are connecting \n(e.g., if employees are receiving company email on personal cell phones, is the contractor \nchecking to verify that only known/expected devices are connecting) [d]?",
      "Is the use of external systems limited, including by policy or physical control [f]?",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.iii",
      "NIST SP 800-171 Rev 2 3.1.20",
    ],
  },
  {
    id: 4,
    level: 1,
    section: "3.1.22",
    section_name: "CONTROL PUBLIC INFORMATION ",
    brief_description:
      "Control information posted or processed on publicly accessible information systems. \n",
    assessment_objectives: {
      a: "individuals authorized to post or process information on publicly accessible systems \nare identified;",
      b: "procedures to ensure FCI is not posted or processed on publicly accessible systems are \nidentified;",
      c: "a review process is in place prior to posting of any content to publicly accessible \nsystems;",
      d: "content on publicly accessible systems is reviewed to ensure that it does not include \nFCI; and",
      e: "mechanisms are in place to remove and address improper posting of FCI.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing publicly accessible content; \nsystem security plan; list of users authorized to post publicly accessible content on \norganizational systems; training materials and/or records; records of publicly accessible \ninformation reviews; records of response to nonpublic information on public websites; \nsystem audit logs and records; security awareness training records; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for managing publicly accessible \ninformation posted on organizational systems; personnel with information security \nresponsibilities]",
    test: "[SELECT FROM: Mechanisms implementing management of publicly accessible content]",
    discussion:
      "In accordance with laws, Executive Orders, directives, policies, regulations, or standards, the \npublic is not authorized access to nonpublic information (e.g., information protected under \nthe Privacy Act, FCI, and proprietary information). This requirement addresses systems that \nare controlled by the organization and accessible to the public, typically without \nidentification or authentication. Individuals authorized to post FCI onto publicly accessible \nsystems are designated. The content of information is reviewed prior to posting onto \npublicly accessible systems to ensure that nonpublic information is not included.",
    further_discussion:
      "Do not allow FCI to become public – always safeguard the confidentiality of FCI by controlling \nthe posting of FCI on company-controlled websites or public forums, and the exposure of FCI \nin public presentations or on public displays. It is important to know which users are allowed \nto publish information on publicly accessible systems, like your company website, and \nimplement a review process before posting such information. If FCI is discovered on a \npublicly accessible system, procedures should be in place to remove that information and \nalert the appropriate parties.",
    fd_examples: {
      Example:
        "Your company decides to start issuing press releases about its projects in an effort to reach \nmore potential customers. Your company receives FCI from the government as part of its \nDoD contract. Because you recognize the need to manage controlled information, including \nFCI, you meet with the employees who write the releases and post information to establish \na review process [c]. It is decided that you will review press releases for FCI before posting \nit on the company website [a,d]. Only certain employees will be authorized to post to the \nwebsite [a].",
    },
    fd_pac: [
      "Does information on externally facing systems (i.e., publicly accessible) have a \ndocumented approval chain for public release [c]?",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.iv",
      "NIST SP 800-171 Rev 2 3.1.22",
    ],
  },
  {
    id: 5,
    level: 2,
    section: "3.1.3",
    section_name: "CONTROL CUI FLOW ",
    brief_description:
      "Control the flow of CUI in accordance with approved authorizations. \n",
    assessment_objectives: {
      a: "information flow control policies are defined;",
      b: "methods and enforcement mechanisms for controlling the flow of CUI are defined;",
      c: "designated sources and destinations (e.g., networks, individuals, and devices) for CUI \nwithin the system and between interconnected systems are identified;",
      d: "authorizations for controlling the flow of CUI are defined; and",
      e: "approved authorizations for controlling the flow of CUI are enforced.",
    },
    examine:
      "[SELECT FROM: Access control policy; information flow control policies; procedures \naddressing information flow enforcement; system security plan; system design \ndocumentation; system configuration settings and associated documentation; list of \ninformation flow authorizations; system baseline configuration; system audit logs and \nrecords; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developers]",
    test: "[SELECT FROM: Mechanisms implementing information flow enforcement policy]",
    discussion:
      "Information flow control regulates where information can travel within a system and \nbetween systems (versus who can access the information) and without explicit regard to \nsubsequent accesses to that information. Flow control restrictions include the following: \nkeeping export-controlled information from being transmitted in the clear to the internet; \nblocking outside traffic that claims to be from within the organization; restricting requests \nto the internet that are not from the internal web proxy server; and limiting information \ntransfers between organizations based on data structures and content. \nOrganizations commonly use information flow control policies and enforcement \nmechanisms to control the flow of information between designated sources and destinations \n(e.g., networks, individuals, and devices) within systems and between interconnected \nsystems. Flow control is based on characteristics of the information or the information path. \nEnforcement occurs in boundary protection devices (e.g., gateways, routers, guards, \nencrypted tunnels, firewalls) that employ rule sets or establish configuration settings that \nrestrict system services, provide a packet-filtering capability based on header information, \nor message-filtering capability based on message content (e.g., implementing key word \nsearches or using document characteristics). Organizations \nalso consider the \ntrustworthiness of filtering and inspection mechanisms (i.e., hardware, firmware, and \nsoftware components) that are critical to information flow enforcement. \nTransferring information between systems representing different security domains with \ndifferent security policies introduces risk that such transfers violate one or more domain \nsecurity policies. \nOrganizations consider the shared nature of commercial telecommunications services in the \nimplementation of security requirements associated with the use of such services. \nCommercial telecommunications services are commonly based on network components and \nconsolidated management systems shared by all attached commercial customers and may \nalso include third party-provided access lines and other service elements. Such transmission \nservices may represent sources of increased risk despite contract security provisions. NIST \nSP 800-41 provides guidance on firewalls and firewall policy. SP 800-125B provides \nguidance on security for virtualization technologies. \nIn such situations, information owners or stewards provide guidance at designated policy \nenforcement points between interconnected systems. Organizations consider mandating \nspecific architectural solutions when required to enforce specific security policies. \nEnforcement includes: prohibiting information transfers between interconnected systems \n(i.e., allowing access only); employing hardware mechanisms to enforce one-way \ninformation flows; and implementing trustworthy regrading mechanisms to reassign \nsecurity attributes and security labels.",
    further_discussion:
      "Typically, companies will have a firewall between the internal network and the internet. \nOften multiple firewalls or routing switches are used inside a network to create zones to \nseparate sensitive data, business units, or user groups. Proxy servers can be used to break \nthe connection between multiple networks. All traffic entering or leaving a network is \nintercepted by the proxy, preventing direct access between networks. Companies should \nalso ensure by policy and enforcement mechanisms that all CUI allowed to flow across the \ninternet is encrypted.",
    fd_examples: {
      "Example 1":
        "As a system administrator, you configure a proxy device on your company’s network. Your \ngoal is to better mask and protect the devices inside the network while enforcing information \nflow policies. After the device is configured, information does not flow directly from the \ninternal network to the internet. The proxy device intercepts the traffic and analyzes it to \ndetermine if the traffic conforms to organization information flow control policies. If it does, \nthe device allows the information to pass to its destination [b]. The proxy blocks traffic that \ndoes not meet policy requirements [e].",
      "Example 2":
        "As a subcontractor on a DoD contract, your organization sometimes needs to transmit CUI to \nthe prime contractor. You create a policy document that specifies who is allowed to transmit \nCUI and that such transmission requires manager approval [a,c,d]. The policy instructs users \nto encrypt any CUI transmitted via email or to use a designated secure file sharing utility \n[b,d]. The policy states that users who do not follow appropriate procedures may be subject \nto disciplinary action [e].",
    },
    fd_pac: [
      "Are designated sources of regulated data identified within the system (e.g., internal \nnetwork and IP address) and between interconnected systems (e.g., external networks, \nIP addresses, ports, and protocols) [c]?",
      "Are designated destinations of regulated data identified within the system (e.g., internal \nnetwork and IP address) and between interconnected systems (external networks and \nIP addresses) [c]?",
      "Are authorizations defined for each source and destination within the system and \nbetween interconnected systems (e.g., allow or deny rules for each combination of source \nand destination) [d]?",
      "Are approved authorizations for controlling the flow of regulated data enforced within \nthe system and between interconnected systems (e.g., traffic between authorized sources \nand destinations is allowed and traffic between unauthorized sources and destinations \nis denied) [e]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.3"],
  },
  {
    id: 6,
    level: 2,
    section: "3.1.4",
    section_name: "SEPARATION OF DUTIES ",
    brief_description:
      "Separate the duties of individuals to reduce the risk of malevolent activity without collusion. \n",
    assessment_objectives: {
      a: "the duties of individuals requiring separation are defined;",
      b: "responsibilities for duties that require separation are assigned to separate individuals; \nand",
      c: "access privileges that enable individuals to exercise the duties that require separation \nare granted to separate individuals.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing divisions of responsibility and \nseparation of duties; system security plan; system configuration settings and associated \ndocumentation; list of divisions of responsibility and separation of duties; system access \nauthorizations; system audit logs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for defining divisions of responsibility and \nseparation of duties; personnel with information security responsibilities; system or \nnetwork administrators]",
    test: "[SELECT FROM: Mechanisms implementing separation of duties policy]",
    discussion:
      "Separation of duties addresses the potential for abuse of authorized privileges and helps to \nreduce the risk of malevolent activity without collusion. Separation of duties includes \ndividing mission functions and system support functions among different individuals or \nroles; conducting system support functions with different individuals (e.g., configuration \nmanagement, quality assurance and testing, system management, programming, and \nnetwork security); and ensuring that security personnel administering access control \nfunctions do not also administer audit functions. Because separation of duty violations can \nspan systems and application domains, organizations consider the entirety of organizational \nsystems and system components when developing policy on separation of duties.",
    further_discussion:
      "No one person should be in charge of an entire critical task from beginning to end. \nDocumenting and dividing elements of important duties and tasks between employees \nreduces intentional or unintentional execution of malicious activities.",
    fd_examples: {
      "Example 1":
        "You are responsible for the management of several key systems within your organization. \nYou assign the task of reviewing the system logs to two different people. This way, no one \nperson is solely responsible for the execution of this critical security function [c].",
      "Example 2":
        "You are a system administrator. Human Resources notifies you of a new hire, and you create \nan account with general privileges, but you are not allowed to grant access to systems that \ncontain CUI [a,b]. The program manager contacts the team in your organization that has \nsystem administration authority over the CUI systems and informs them which CUI the new \nhire will need to access. Subsequently, a second system administrator grants access \nprivileges to the new hire [c].",
    },
    fd_pac: [
      "Does system documentation identify the system functions or processes that require \nseparation of duties (e.g., function combinations that represent a conflict of interest or \nan over-allocation of security privilege for one individual) [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.4"],
  },
  {
    id: 7,
    level: 2,
    section: "3.1.5",
    section_name: "LEAST PRIVILEGE ",
    brief_description:
      "Employ the principle of least privilege, including for specific security functions and \nprivileged accounts. \n",
    assessment_objectives: {
      a: "privileged accounts are identified;",
      b: "access to privileged accounts is authorized in accordance with the principle of least \nprivilege;",
      c: "security functions are identified; and",
      d: "access to security functions is authorized in accordance with the principle of least \nprivilege.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing account management; system \nsecurity plan; system design documentation; system configuration settings and associated \ndocumentation; list of active system accounts and the name of the individual associated with \neach account; list of conditions for group and role membership; notifications or records of \nrecently transferred, separated, or terminated employees; list of recently disabled system \naccounts along with the name of the individual associated with each account; access \nauthorization records; account management compliance reviews; system monitoring/audit \nrecords; procedures addressing least privilege; list of security functions (deployed in \nhardware, software, and firmware) and security-relevant information for which access is to \nbe explicitly authorized; list of system-generated privileged accounts; list of system \nadministration personnel; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with account management responsibilities; system or network \nadministrators; personnel with information security responsibilities; personnel with \nresponsibilities for defining least privileges necessary to accomplish specified tasks]",
    test: "[SELECT FROM: Organizational processes for managing system accounts; mechanisms for \nimplementing account management; mechanisms implementing least privilege functions; \nmechanisms prohibiting privileged access to the system]",
    discussion:
      "Organizations employ the principle of least privilege for specific duties and authorized \naccesses for users and processes. The principle of least privilege is applied with the goal of \nauthorized privileges no higher than necessary to accomplish required organizational \nmissions or business functions. Organizations consider the creation of additional processes, \nroles, and system accounts as necessary, to achieve least privilege. Organizations also apply \nleast privilege to the development, implementation, and operation of organizational systems. \nSecurity functions include establishing system accounts, setting events to be logged, setting \nintrusion detection parameters, and configuring access authorizations (i.e., permissions, \nprivileges). \nPrivileged accounts, including super user accounts, are typically described as system \nadministrator for various types of commercial off-the-shelf operating systems. Restricting \nprivileged accounts to specific personnel or roles prevents day-to-day users from having \naccess to privileged information or functions. Organizations may differentiate in the \napplication of this requirement between allowed privileges for local accounts and for domain \naccounts provided organizations retain the ability to control system configurations for key \nsecurity parameters and as otherwise necessary to sufficiently mitigate risk.",
    further_discussion:
      "The principle of least privilege applies to all users and processes on all systems, but it is \ncritical to systems containing or accessing CUI. Least privilege: \n restricts user access to only the machines and information needed to fulfill job \nresponsibilities; and \n limits what system configuration settings users can change, only allowing individuals \nwith a business need to change them.",
    fd_examples: {
      Example:
        "As a system administrator, you create accounts. By default, everyone is assigned a basic user \nrole, which prevents a user from modifying system configurations. Privileged access is only \nassigned to users and processes that require it to carry out job functions, such as IT staff, and \nis very selectively granted [b,d].",
    },
    fd_pac: [
      "Are privileged accounts documented and is when they may be used defined [a]?",
      "Are users assigned privileged accounts to perform their job functions only when it is \nnecessary [b]?",
      "Are necessary security functions identified (e.g., access control configuration, system \nconfiguration settings, or privileged account lists) that must be managed through the use \nof privileged accounts [c]?",
      "Is access to privileged functions and security information restricted to authorized \nemployees [d]?6",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.5"],
  },
  {
    id: 8,
    level: 2,
    section: "3.1.6",
    section_name: "NON-PRIVILEGED ACCOUNT USE ",
    brief_description:
      "Use non-privileged accounts or roles when accessing nonsecurity functions. \n",
    assessment_objectives: {
      a: "nonsecurity functions are identified; and",
      b: "users are required to use non-privileged accounts or roles when accessing nonsecurity \nfunctions.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing least privilege; system \nsecurity plan; list of system-generated security functions assigned to system accounts or \nroles; system configuration settings and associated documentation; system audit logs and \nrecords; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for defining least privileges necessary to \naccomplish specified organizational tasks; personnel with information security \nresponsibilities; system or network administrators]",
    test: "[SELECT FROM: Mechanisms implementing least privilege functions]",
    discussion:
      "This requirement limits exposure when operating from within privileged accounts or roles. \nThe inclusion of roles addresses situations where organizations implement access control \npolicies such as role-based access control and where a change of role provides the same \ndegree of assurance in the change of access authorizations for the user and all processes \nacting on behalf of the user as would be provided by a change between a privileged and non-\nprivileged account.",
    further_discussion:
      "A user with a privileged account can perform more tasks and access more information than \na person with a non-privileged account. Tasks (including unauthorized tasks orchestrated \nby attackers) performed when using the privileged account can have a greater impact on the \nsystem. System administrators and users with privileged accounts must be trained not to use \ntheir privileged accounts for everyday tasks, such as browsing the internet or connecting \nunnecessarily to other systems or services.-Privileged Account Use",
    fd_examples: {
      Example:
        "You are a system administrator logged in using your privileged account and you need to look \nup how to reset a non-functioning application. You should log on to another computer with \nyour non-privileged account before you connect to the web and start searching for the reset \ninformation [b]. That way, if your account is compromised during the search, it will be your \nregular user account rather than an account with elevated privileges.",
    },
    fd_pac: [
      "Are nonsecurity functions and non-privileged roles defined [a,b]?",
      "Is it required that nonsecurity functions only be accessed with the use of non-privileged \naccounts? How is this verified [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.6"],
  },
  {
    id: 9,
    level: 2,
    section: "3.1.7",
    section_name: "PRIVILEGED FUNCTIONS ",
    brief_description:
      "Prevent non-privileged users from executing privileged functions and capture the execution \nof such functions in audit logs. \n",
    assessment_objectives: {
      a: "privileged functions are defined;",
      b: "non-privileged users are defined;",
      c: "non-privileged users are prevented from executing privileged functions; and",
      d: "the execution of privileged functions is captured in audit logs.",
    },
    examine:
      "[SELECT FROM: Privacy and security policies, procedures addressing system use \nnotification; documented approval of system use notification messages or banners; system \naudit logs and records; system design documentation; user acknowledgements of \nnotification message or banner; system security plan; system use notification messages; \nsystem configuration settings and associated documentation; other relevant documents or \nrecords]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for defining least privileges necessary to \naccomplish specified tasks; personnel with information security responsibilities; system \ndevelopers]",
    test: "[SELECT FROM: Mechanisms implementing least privilege functions for non-privileged \nusers; mechanisms auditing the execution of privileged functions]",
    discussion:
      "Privileged functions include establishing system accounts, performing system integrity \nchecks, conducting patching operations, or administering cryptographic key management \nactivities. Non-privileged users are individuals that do not possess appropriate \nauthorizations. Circumventing intrusion detection and prevention mechanisms or malicious \ncode protection mechanisms are examples of privileged functions that require protection \nfrom non-privileged users. Note that this requirement represents a condition to be achieved \nby the definition of authorized privileges in 3.1.2 (AC.L1-3.1.2). \nMisuse of privileged functions, either intentionally or unintentionally by authorized users, \nor by unauthorized external entities that have compromised system accounts, is a serious \nand ongoing concern and can have significant adverse impacts on organizations. Logging the \nuse of privileged functions is one way to detect such misuse, and in doing so, help mitigate \nthe risk from insider threats and the advanced persistent threat.",
    further_discussion:
      "Non-privileged users should receive only those permissions required to perform their basic \njob functions. Privileged users are granted additional permissions because their jobs require \nthem. Privileged functions typically involve the control, monitoring, or administration of the \nsystem and its security measures. When these special privileged functions are performed, \nthe activity must be captured in an audit log, which can be used to identify abuse. Non-\nprivileged employees must not be granted permission to perform any of the functions of a \nprivileged user. \nThis practice, AC.L2-3.1.7, manages non-privileged users by logging any attempts to execute \nprivileged functions. AC.L2-3.1.7 leverages AU.L2-3.3.2, which ensures logging and \ntraceability of user actions. AC.L2-3.1.7 also extends AC.L1-3.1.2, which defines a \nrequirement to limit types of transactions and functions to those that authorized users are \npermitted to execute.",
    fd_examples: {
      Example:
        "As a system administrator for your organization, you have put security controls in place that \nprevent non-privileged users from performing privileged activities [a,b,c]. However, you \naccidentally gave a standard user elevated system administrator privileges. The organization \nhas implemented an endpoint detection and response solution that provides visibility into \nthe use of privileged activities. The monitoring system logs a security misconfiguration \nbecause the use of administrative privileges was performed by a user who was not known to \nhave that ability. This allows you to correct the error [d].",
    },
    fd_pac: [
      "Is it possible to identify who enabled privileges at any particular time [d]?",
      "Are the privileged system functions documented (e.g., functions that involve the control, \nmonitoring or administration of the system, including security functions and log \nmanagement) [a]?",
      "Do documented procedures describe the configuration of the system to ensure system \nroles do not grant non-privileged users the ability to execute privileged functions [c]?",
      "Do procedures describe the configuration of system settings to capture the execution of \nall privileged functions in audit logs [d]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.7"],
  },
  {
    id: 10,
    level: 2,
    section: "3.1.8",
    section_name: "UNSUCCESSFUL LOGON ATTEMPTS ",
    brief_description: "Limit unsuccessful logon attempts. \n",
    assessment_objectives: {
      a: "the means of limiting unsuccessful logon attempts is defined; and",
      b: "the defined means of limiting unsuccessful logon attempts is implemented.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing unsuccessful logon attempts; \nsystem security plan; system design documentation; system configuration settings and \nassociated documentation; system audit logs and records; other relevant documents or \nrecords]",
    interview:
      "[SELECT FROM: Personnel with information security responsibilities; system developers; \nsystem or network administrators]",
    test: "[SELECT FROM: Mechanisms implementing access control policy for unsuccessful logon \nattempts]",
    discussion:
      "This requirement applies regardless of whether the logon occurs via a local or network \nconnection. Due to the potential for denial of service, automatic lockouts initiated by systems \nare, in most cases, temporary and automatically release after a predetermined period \nestablished by the organization (i.e., a delay algorithm). If a delay algorithm is selected, \norganizations may employ different algorithms for different system components based on \nthe capabilities of the respective components. Responses to unsuccessful logon attempts \nmay be implemented at the operating system and application levels.",
    further_discussion:
      "Consecutive unsuccessful logon attempts may indicate malicious activity. Contractors can \nmitigate these attacks by limiting the number of unsuccessful logon attempts, typically by \nlocking the account. A defined number of consecutive unsuccessful logon attempts is a \ncommon configuration setting. Contractors are expected to set this number at a level that fits \ntheir risk profile with the knowledge that fewer unsuccessful attempts provide higher \nsecurity. \nAfter an unsuccessful login attempt threshold is exceeded and the system locks an account, \nthe account may either remain locked until an administrator takes action to unlock it, or it \nmay be locked for a predefined time after which it unlocks automatically.",
    fd_examples: {
      Example:
        "You attempt to log on to your work computer. You mistype your password three times in a \nrow, and an error message is generated telling you the account is locked [b]. You call your IT \nhelp desk or system administrator to request assistance. The system administrator explains \nthat the account is locked as a result of three unsuccessful logon attempts [a]. The \nadministrator offers to unlock the account and notes that you can wait 30 minutes for the \naccount to unlock automatically.",
    },
    fd_pac: [
      "Is there a defined threshold for the number of unsuccessful logon attempts for which the \nsystem takes action to prevent additional attempts [a]?",
      "Is a mechanism for limiting the number of unsuccessful logon attempts implemented and \ndoes it use the defined threshold [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.8 & Security Notices"],
  },
  {
    id: 11,
    level: 2,
    section: "3.1.9",
    section_name: "PRIVACY & SECURITY NOTICES ",
    brief_description:
      "Provide privacy and security notices consistent with applicable CUI rules. \n",
    assessment_objectives: {
      a: "privacy and security notices required by CUI-specified rules are identified, consistent, \nand associated with the specific CUI category; and",
      b: "privacy and security notices are displayed.",
    },
    examine:
      "[SELECT FROM: Privacy and security policies, procedures addressing system use \nnotification; documented approval of system use notification messages or banners; system \naudit logs and records; system design documentation; user acknowledgements of \nnotification message or banner; system security plan; system use notification messages; \nsystem configuration settings and associated documentation; other relevant documents or \nrecords]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; personnel with responsibility for providing legal advice; system \ndevelopers]",
    test: "[SELECT FROM: Mechanisms implementing system use notification]",
    discussion:
      "System use notifications can be implemented using messages or warning banners displayed \nbefore individuals log in to organizational systems. System use notifications are used only \nfor access via logon interfaces with human users and are not required when such human \ninterfaces do not exist. Based on a risk assessment, organizations consider whether a \nsecondary system use notification is needed to access applications or other system resources \nafter the initial network logon. Where necessary, posters or other printed materials may be \nused in lieu of an automated system banner. Organizations consult with the Office of General \nCounsel for legal review and approval of warning banner content.",
    further_discussion:
      "Every system containing or providing access to CUI has legal requirements concerning user \nprivacy and security notices. One method of addressing this requirement is the use of a & Security Notices \nsystem-use notification banner that displays the legal requirements of using the system. \nUsers may be required to click to agree to the displayed requirements of using the system \neach time they log on to the machine. This agreement can be used in the civil and/or criminal \nprosecution of an attacker that violates the terms. \nThe legal notification should meet all applicable requirements. At a minimum, the notice \nshould inform the user that: \n information system usage may be monitored or recorded, and is subject to audit; \n unauthorized use of the information systems is prohibited; \n unauthorized use is subject to criminal and civil penalties;  \n use of the information system affirms consent to monitoring and recording; \n the information system contains CUI with specific requirements imposed by the \nDepartment of Defense; and \n use of the information system may be subject to other specified requirements associated \nwith certain types of CUI such as Export Controlled information.",
    fd_examples: {
      Example:
        "You are setting up IT equipment including a database server that will contain CUI. You have \nworked with legal counsel to draft a notification. It contains both general and specific CUI \nsecurity and privacy requirements [a]. The system displays the required security and privacy \ninformation before anyone logs on to your organization’s computers that contain or provide \naccess to CUI [b].  \nFor more information on CUI, refer to https://www.dodcui.mil/.",
    },
    fd_pac: [
      "Are requirements identified for privacy and security notices, and do the implemented \npractices match those identified requirements [a,b]? Discrepancies may indicate a \ndeficient process and/or an incomplete practice.",
      "Are there any special requirements associated with the specific CUI category [a]?",
      "Are appropriate notices displayed in areas where paper-based CUI is stored and \nprocessed [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.9"],
  },
  {
    id: 12,
    level: 2,
    section: "3.1.10",
    section_name: "SESSION LOCK ",
    brief_description:
      "Use session lock with pattern-hiding displays to prevent access and viewing of data after a \nperiod of inactivity. \n",
    assessment_objectives: {
      a: "the period of inactivity after which the system initiates a session lock is defined;",
      b: "access to the system and viewing of data is prevented by initiating a session lock after \nthe defined period of inactivity; and",
      c: "previously visible information is concealed via a pattern-hiding display after the \ndefined period of inactivity.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing session lock; procedures \naddressing identification and authentication; system design documentation; system \nconfiguration settings and associated documentation; system security plan; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developers]",
    test: "[SELECT FROM: Mechanisms implementing access control policy for session lock]",
    discussion:
      "Session locks are temporary actions taken when users stop work and move away from the \nimmediate vicinity of the system but do not want to log out because of the temporary nature \nof their absences. Session locks are implemented where session activities can be determined, \ntypically at the operating system level (but can also be at the application level). Session locks \nare not an acceptable substitute for logging out of the system, for example, if organizations \nrequire users to log out at the end of the workday. \nPattern-hiding displays can include static or dynamic images, for example, patterns used \nwith screen savers, photographic images, solid colors, clock, battery life indicator, or a blank \nscreen, with the additional caveat that none of the images convey controlled unclassified \ninformation.",
    further_discussion:
      "Session locks can be initiated by the user or, more fundamentally, enabled automatically \nwhen the system has been idle for a period of time, for example, five minutes. Session locks \nare a quick way to prevent unauthorized use of the systems without having a user log off. \nMinimum configuration requirements are left up to the organization to define.  \nA locked session shows pattern-hiding information on the screen to mask the data on the \ndisplay.",
    fd_examples: {
      Example:
        "You are a system administrator. You notice that employees leave their offices without locking \ntheir computers. Sometimes their screens display sensitive company information. You \nconfigure all machines to lock after five minutes of inactivity [a,b]. You also remind your \ncoworkers to lock their systems when they walk away [a].",
    },
    fd_pac: [
      "Does the session lock hide previously visible information (e.g., replacing what was visible \nwith a lock screen or screensaver that does not include sensitive information) [c]?",
      "If session locks are not managed centrally, how are all computer users made aware of the \nrequirements and how to configure them [a,b,c]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.10"],
  },
  {
    id: 13,
    level: 2,
    section: "3.1.11",
    section_name: "SESSION TERMINATION ",
    brief_description:
      "Terminate (automatically) a user session after a defined condition. \n",
    assessment_objectives: {
      a: "conditions requiring a user session to terminate are defined; and",
      b: "a user session is automatically terminated after any of the defined conditions occur.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing session termination; system \ndesign documentation; system security plan; system configuration settings and associated \ndocumentation; list of conditions or trigger events requiring session disconnect; system \naudit logs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developers]",
    test: "[SELECT FROM: Mechanisms implementing user session termination]",
    discussion:
      "This requirement addresses the termination of user-initiated logical sessions in contrast to \nthe termination of network connections that are associated with communications sessions \n(i.e., disconnecting from the network). A logical session (for local, network, and remote \naccess) is initiated whenever a user (or process acting on behalf of a user) accesses an \norganizational system. Such user sessions can be terminated (and thus terminate user \naccess) without terminating network sessions. Session termination terminates all processes \nassociated with a user’s logical session except those processes that are specifically created \nby the user (i.e., session owner) to continue after the session is terminated. Conditions or \ntrigger events requiring automatic session termination can include organization-defined \nperiods of user inactivity, targeted responses to certain types of incidents, and time-of-day \nrestrictions on system use.",
    further_discussion:
      "Configure the system to terminate user sessions based on the organization’s policy. Session \ntermination policies can be simple or sophisticated.",
    fd_examples: {
      "Example 1":
        "You are the system administrator for your organization and configure the system to \nterminate all user sessions after 1 hour of inactivity [a]. As the session timeout approaches, \nthe system prompts users with a warning banner asking if they want to continue the session. \nWhen the session timeout does occur, the login page pops up, and the users must log in to \nstart a new session [b].",
      "Example 2":
        "A user is logged into a corporate database containing CUI but is not authorized to view CUI. \nThe user has submitted a series of queries that unintentionally violate policy, as they attempt \nto extract CUI that the user is not authorized to view [a]. The session terminates with a \nwarning as a result of a violation of corporate policy [b]. The user must reestablish the \nsession before being able to submit additional legitimate queries.",
    },
    fd_pac: [
      "Are the conditions in which a user session must be terminated described (e.g., after a \nperiod of inactivity or after a defined time limit) [a]?",
      "Are procedures documented that describe how to configure the system to enable \nautomatic termination of user sessions after any of the defined conditions occur [b]?",
      "Are user sessions terminated based on organizationally defined conditions [a,b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.11"],
  },
  {
    id: 14,
    level: 2,
    section: "3.1.12",
    section_name: "CONTROL REMOTE ACCESS ",
    brief_description: "Monitor and control remote access sessions. \n",
    assessment_objectives: {
      a: "remote access sessions are permitted;",
      b: "the types of permitted remote access are identified;",
      c: "remote access sessions are controlled; and",
      d: "remote access sessions are monitored.",
    },
    examine:
      "[SELECT \nFROM: \nAccess \ncontrol \npolicy; \nprocedures \naddressing \nremote \naccess \nimplementation and usage (including restrictions); configuration management plan; system \nsecurity plan; system design documentation; system configuration settings and associated \ndocumentation; remote access authorizations; system audit logs and records; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for managing remote access connections; \nsystem or network administrators; personnel with information security responsibilities]",
    test: "[SELECT FROM: Remote access management capability for the system]",
    discussion:
      "Remote access is access to organizational systems by users (or processes acting on behalf of \nusers) communicating through external networks (e.g., the internet). Remote access \nmethods include dial-up, broadband, and wireless. Organizations often employ encrypted \nvirtual private networks (VPNs) to enhance confidentiality over remote connections. The use \nof encrypted VPNs does not make the access non-remote; however, the use of VPNs, when \nadequately provisioned with appropriate control (e.g., employing encryption techniques for \nconfidentiality protection), may provide sufficient assurance to the organization that it can \neffectively treat such connections as internal networks. VPNs with encrypted tunnels can \naffect the capability to adequately monitor network communications traffic for malicious \ncode. \nAutomated monitoring and control of remote access sessions allows organizations to detect \ncyber-attacks and help to ensure ongoing compliance with remote access policies by auditing \nconnection activities of remote users on a variety of system components (e.g., servers, \nworkstations, notebook computers, smart phones, and tablets). \nNIST SP 800-46, SP 800-77, and SP 800-113 provide guidance on secure remote access and \nvirtual private networks.",
    further_discussion:
      "Remote access connections pass through untrusted networks and therefore require proper \nsecurity controls such as encryption to ensure data confidentiality. Initialization of all remote \nsessions should ensure that only authorized users and devices are connecting. After the \nremote session is established, the connection is monitored to track who is accessing the \nnetwork remotely and what files are being accessed during the session. \nRemote access sessions can encompass more than just remote connections back to a \nheadquarters network. Access to cloud-based email providers or server infrastructures also \nare relevant to this practice if those environments contain CUI. \nThis practice, AC.L2-3.1.12, requires the control of remote access sessions and complements \nfive other practices dealing with remote access (AC.L2-3.1.14, AC.L2-3.1.13, AC.L2-3.1.15, \nIA.L2-3.5.3, and MA.L2-3.7.5): \n AC.L2-3.1.14 limits remote access to specific access control points. \n AC.L2-3.1.13 requires the use of cryptographic mechanisms when enabling remote \nsessions. \n AC.L2-3.1.15 requires authorization for privileged commands executed during a remote \nsession. \n IA.L2-3.5.3 requires multifactor authentication for network access to non-privileged \naccounts. \n Finally, MA.L2-3.7.5 requires the addition of multifactor authentication for remote \nmaintenance sessions.",
    fd_examples: {
      Example:
        "You often need to work from remote locations, such as your home or client sites, and you are \npermitted to access your organization’s internal networks from those remote locations [a]. \nA system administrator issues you a company laptop with VPN software installed, which is \nrequired to connect to the networks remotely [b]. After the laptop connects to the VPN \nserver, you must accept a privacy notice that states that the company’s security department \nmay monitor the connection. This monitoring is achieved through the analysis of data from \nsensors on the network notifying IT if issues arise. The security department may also review \naudit logs to see who is connecting remotely, when, and what information they are accessing \n[d]. During session establishment, the message “Verifying Compliance” means software like \na Device Health Check (DHC) application is checking the remote device to ensure it meets \nthe established requirements to connect [c].",
    },
    fd_pac: [
      "Do policies identify when remote access is permitted and what methods must be used \n[a,b]?",
      "Are systems configured to permit only approved remote access sessions (e.g., disallow \nremote access sessions by default) [c]?",
      "Are automated or manual mechanisms employed for monitoring remote connections? If \nthe monitoring is manual, does it occur at a frequency commensurate with the level of \nrisk [d]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.12"],
  },
  {
    id: 15,
    level: 2,
    section: "3.1.13",
    section_name: "REMOTE ACCESS CONFIDENTIALITY ",
    brief_description:
      "Employ cryptographic mechanisms to protect the confidentiality of remote access sessions. \n",
    assessment_objectives: {
      a: "cryptographic mechanisms to protect the confidentiality of remote access sessions are \nidentified; and",
      b: "cryptographic mechanisms to protect the confidentiality of remote access sessions are \nimplemented.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing remote access to the system; \nsystem security plan; system design documentation; system configuration settings and \nassociated documentation; cryptographic mechanisms and associated configuration \ndocumentation; system audit logs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developers]",
    test: "[SELECT FROM: Cryptographic mechanisms protecting remote access sessions]",
    discussion:
      "Cryptographic standards include FIPS-validated cryptography and NSA-approved \ncryptography.",
    further_discussion:
      "A remote access session involves logging into the organization’s systems such as its internal \nnetwork or a cloud service provider from a remote location such as home or an alternate \nwork site. This remote access session must be secured using FIPS-validated cryptography to \nprovide confidentiality and prevent anyone from deciphering session information \nexchanges. \nWhen CMMC requires cryptography, it is to protect the confidentiality of CUI. FIPS-validated \ncryptography means the cryptographic module has to have been tested and validated to \nmeet FIPS 140-1 or -2 requirements. Simply using an approved algorithm is not sufficient – \nthe module (software and/or hardware) used to implement the algorithm must be \nseparately validated under FIPS 140. Accordingly, FIPS-validated cryptography is required \nto meet CMMC practices that protect CUI when transmitted or stored outside the protected \nenvironment of the covered contractor information system (including wireless/remote \naccess). Encryption used for other purposes, such as within applications or devices within \nthe protected environment of the covered contractor information system, would not need to \nbe FIPS-validated. This practice, AC.L2-3.1.13, requires the use of cryptographic mechanisms \nwhen enabling remote sessions and complements five other practices dealing with remote \naccess (AC.L2-3.1.12, AC.L2-3.1.14, AC.L2-3.1.15, IA.L2-3.5.3, and MA.L2-3.7.5):  \n AC.L2-3.1.12 requires the control of remote access sessions.  \n AC.L2-3.1.14 limits remote access to specific access control points.  \n AC.L2-3.1.15 requires authorization for privileged commands executed during a remote \nsession.  \n IA.L2-3.5.3 requires multifactor authentication for network access to non-privileged \naccounts.  \n Finally, MA.L2-3.7.5 requires the addition of multifactor authentication for remote \nmaintenance sessions.",
    fd_examples: {
      Example:
        "As a system administrator you are responsible for implementing a remote network access \ncapability for users who work offsite. In order to provide session confidentiality, you decide \nto implement a VPN mechanism and select a product that has completed FIPS 140 validation \n[a,b].",
    },
    fd_pac: [
      "Are cryptographic mechanisms used for remote access sessions (e.g., Transport Layer \nSecurity (TLS) and Internet Protocol Security (IPSec) using FIPS-validated encryption \nalgorithms) defined and implemented [a,b]? Note that simply using an approved \nalgorithm is not sufficient – the module (software and/or hardware) used to implement \nthe algorithm must be separately validated under FIPS 140.",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.13"],
  },
  {
    id: 16,
    level: 2,
    section: "3.1.14",
    section_name: "REMOTE ACCESS ROUTING ",
    brief_description:
      "Route remote access via managed access control points. \n",
    assessment_objectives: {
      a: "managed access control points are identified and implemented; and",
      b: "remote access is routed through managed network access control points.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing remote access to the system; \nsystem security plan; system design documentation; list of all managed network access \ncontrol points; system configuration settings and associated documentation; system audit \nlogs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities]",
    test: "[SELECT FROM: Mechanisms routing all remote accesses through managed network access \ncontrol points]",
    discussion:
      "Routing remote access through managed access control points enhances explicit, \norganizational control over such connections, reducing the susceptibility to unauthorized \naccess to organizational systems resulting in the unauthorized disclosure of CUI.",
    further_discussion:
      "The contractor can route all remote access through a limited number of remote access \ncontrol points to reduce the attack surface and simplify network management. This allows \nfor better monitoring and control of the remote connections. \nThis practice, AC.L2-3.1.14, limits remote access to specific access control points and \ncomplements five other practices dealing with remote access (AC.L2-3.1.12, AC.L2-3.1.13, \nAC.L2-3.1.15, IA.L2-3.5.3, and MA.L2-3.7.5): \n AC.L2-3.1.12 requires the control of remote access sessions. \n AC.L2-3.1.13 requires the use of cryptographic mechanisms when enabling remote \nsessions. \n AC.L2-3.1.15 requires authorization for privileged commands executed during a remote \nsession. \n IA.L2-3.5.3 requires multifactor authentication for network access to non-privileged \naccounts. \n Finally, MA.L2-3.7.5 requires the addition of multifactor authentication for remote \nmaintenance sessions.",
    fd_examples: {
      Example:
        "You are a system administrator for a company with many locations, and several employees \nat different locations need to connect to the organization’s networks while working \nremotely. Because each company location has a direct connection to headquarters, you \ndecide to route all remote access through the headquarters location [a]. All remote traffic is \nrouted through a single location to simplify monitoring [b].",
    },
    fd_pac: [
      "How many managed access control points are implemented [a]?",
      "Is all remote access routed through the managed access control points [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.14"],
  },
  {
    id: 17,
    level: 2,
    section: "3.1.15",
    section_name: "PRIVILEGED REMOTE ACCESS ",
    brief_description:
      "Authorize remote execution of privileged commands and remote access to security-relevant \ninformation. \n",
    assessment_objectives: {
      a: "privileged commands authorized for remote execution are identified;",
      b: "security-relevant information authorized to be accessed remotely is identified;",
      c: "the execution of the identified privileged commands via remote access is authorized; \nand",
      d: "access to the identified security-relevant information via remote access is authorized.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing remote access to the system; \nsystem configuration settings and associated documentation; system security plan; system \naudit logs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities]",
    test: "[SELECT FROM: Mechanisms implementing remote access management]",
    discussion:
      "A privileged command is a human-initiated (interactively or via a process operating on \nbehalf of the human) command executed on a system involving the control, monitoring, or \nadministration of the system including security functions and associated security-relevant \ninformation. Security-relevant information is any information within the system that can \npotentially impact the operation of security functions or the provision of security services in \na manner that could result in failure to enforce the system security policy or maintain \nisolation of code and data. Privileged commands give individuals the ability to execute \nsensitive, security-critical, or security-relevant system functions. Controlling such access \nfrom remote locations helps to ensure that unauthorized individuals are not able to execute \nsuch commands freely with the potential to do serious or catastrophic damage to \norganizational systems. Note that the ability to affect the integrity of the system is considered \nsecurity-relevant as that could enable the means to by-pass security functions although not \ndirectly impacting the function itself.",
    further_discussion:
      "Privileged users are not necessarily allowed to perform their job functions from a remote \nlocation. Likewise, not all privileged commands may be executed remotely. Allowing remote \nexecution of privileged commands or remote access to security-relevant information should \nbe avoided if possible. If absolutely necessary, the privileged commands authorized for \nremote execution should be identified and documented. Document which user roles have \npermissions to remotely execute privileged commands to make changes and to access \nsecurity relevant information. Documentation must be used to establish security \nmechanisms that enforce the policy. \nThis practice, AC.L2-3.1.15, requires authorization for privileged commands executed during \na remote session and complements five other practices dealing with remote access (AC.L2-\n3.1.12, AC.L2-3.1.14, AC.L2-3.1.13, IA.L2-3.5.3, and MA.L2-3.7.5):  \n AC.L2-3.1.12 requires the control of remote access sessions.  \n AC.L2-3.1.14 limits remote access to specific access control points.  \n AC.L2-3.1.13 requires the use of cryptographic mechanisms when enabling remote \nsessions.  \n IA.L2-3.5.3 requires multifactor authentication for network access to non-privileged \naccounts.  \n Finally, MA.L2-3.7.5 requires the addition of multifactor authentication for remote \nmaintenance sessions.  \nThis practice, AC.L2-3.1.15, also extends AC.L1-3.1.2, which limits the types of transactions \nand functions that authorized users are permitted to execute.",
    fd_examples: {
      Example:
        "Your company’s Access Control Policy permits certain work roles to remotely perform a \nlimited set of privileged commands from company-owned computers [a]. As a system \nadministrator, you implement controls to enforce who can remotely execute a privileged \ncommand, which privileged commands they can execute, and who is allowed access to \nsecurity relevant information such as audit log configuration settings [a,c,d].",
    },
    fd_pac: [
      "Does system documentation identify system administration or security functions that \ncan be executed remotely [a]?",
      "Is execution of the identified privileged commands via remote access only authorized for \ndocumented operational needs [c]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.15"],
  },
  {
    id: 18,
    level: 2,
    section: "3.1.16",
    section_name: "WIRELESS ACCESS AUTHORIZATION ",
    brief_description:
      "Authorize wireless access prior to allowing such connections. \n",
    assessment_objectives: {
      a: "wireless access points are identified; and",
      b: "wireless access is authorized prior to allowing such connections.",
    },
    examine:
      "[SELECT FROM: Access control policy; configuration management plan; procedures \naddressing wireless access implementation and usage (including restrictions); system \nsecurity plan; system design documentation; system configuration settings and associated \ndocumentation; wireless access authorizations; system audit logs and records; other \nrelevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for managing wireless access connections; \npersonnel with information security responsibilities]",
    test: "[SELECT FROM: Wireless access management capability for the system]",
    discussion:
      "Establishing usage restrictions and configuration/connection requirements for wireless \naccess to the system provides criteria for organizations to support wireless access \nauthorization decisions. Such restrictions and requirements reduce the susceptibility to \nunauthorized access to the system through wireless technologies. Wireless networks use \nauthentication protocols that provide credential protection and mutual authentication.",
    further_discussion:
      "Guidelines from management form the basis for the requirements that must be met prior to \nauthorizing a wireless connection. These guidelines may include the following: \n types of devices, such as corporate or privately owned equipment; \n configuration requirements of the devices; and \n authorization requirements before granting such connections. \nAC.L2-3.1.16, AC.L2-3.1.17, and AC.L2-3.1.18 are complementary practices in that they all \nestablish requirements to control the connection of mobile devices and wireless devices \nthrough the use of authentication, authorization, and encryption mechanisms.",
    fd_examples: {
      Example:
        "Your company is implementing a wireless network at its headquarters. You work with \nmanagement to draft a policy about the use of the wireless network. The policy states that \nonly company-approved devices that contain verified security configuration settings are \nallowed to connect. The policy also includes usage restrictions that must be followed for \nanyone who wants to use the wireless network. Authorization is required before devices are \nallowed to connect to the wireless network [b].",
    },
    fd_pac: [
      "Is an updated list of approved network devices providing wireless access to the system \nmaintained [a]?",
      "Are network devices providing wireless access configured to require users or devices be \nauthorized prior to permitting a wireless connection [b]?",
      "Is wireless access to the system authorized and managed [b]?8",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.16"],
  },
  {
    id: 19,
    level: 2,
    section: "3.1.17",
    section_name: "WIRELESS ACCESS PROTECTION ",
    brief_description:
      "Protect wireless access using authentication and encryption. \n",
    assessment_objectives: {
      a: "wireless access to the system is protected using authentication; and",
      b: "wireless access to the system is protected using encryption.",
    },
    examine:
      "[SELECT FROM: Access control policy; system design documentation; procedures addressing \nwireless implementation and usage (including restrictions); system security plan; system \nconfiguration settings and associated documentation; system audit logs and records; other \nrelevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developers]",
    test: "[SELECT FROM: Mechanisms implementing wireless access protections to the system]",
    discussion:
      "Organizations authenticate individuals and devices to help protect wireless access to the \nsystem. Special attention is given to the wide variety of devices that are part of the Internet \nof Things with potential wireless access to organizational systems.",
    further_discussion:
      "Use a combination of authentication and encryption methods to protect the access to \nwireless networks. Authenticating users to a wireless access point can be achieved in \nmultiple ways. The most common authentication and encryption methods used include: \n WPA2-PSK (WiFi Protected Access-Pre-shared Key) – This method uses a password or \npassphrase known by the wireless access point and the client (user device). It is common \nin small companies that have little turnover because the key must be changed each time \nan employee leaves in order to prevent the terminated employee from connecting to the \nnetwork without authorization. WPA2 is typically configured to use Advanced \nEncryption Standard (AES) encryption. \n WPA2 Enterprise – This method may be better for larger companies and enterprise \nnetworks because authentication is based on the identity of the individual user or device \nrather than a shared password or passphrase. It typically requires a Remote \nAuthentication Dial-in User Service (RADIUS) server for authentication and can provide \nhigher security than WPA2-PSK.  \nOpen authentication must not be used because it authenticates any user and lacks security \ncapabilities. \nWhen CMMC requires cryptography, it is to protect the confidentiality of CUI. Federal \nInformation Processing Standard (FIPS)-validated cryptography means the cryptographic \nmodule has to have been tested and validated to meet FIPS 140-1 or-2 requirements. Simply \nusing an approved algorithm is not sufficient – the module (software and/or hardware) used \nto implement the algorithm must be separately validated under FIPS 140. Accordingly, FIPS-\nvalidated cryptography is required to meet CMMC practices that protect CUI when \ntransmitted or stored outside the protected environment of the covered contractor \ninformation system (including wireless/remote access). Encryption used for other purposes, \nsuch as within applications or devices within the protected environment of the covered \ncontractor information system, would not need to be FIPS-validated. \nAC.L2-3.1.16, AC.L2-3.1.17, and AC.L2-3.1.18 are complementary practices in that they all \nestablish requirements to control the connection of mobile devices and wireless devices \nthrough the use of authentication, authorization, and encryption mechanisms.",
    fd_examples: {
      "Example 1":
        "You manage the wireless network at a small company and are installing a new wireless \nsolution. You start by selecting a product that employs encryption validated against the \nFIPS 140 standard. You configure the wireless solution to use WPA2, requiring users to enter \na pre-shared key to connect to the wireless network [a,b].",
      "Example 2":
        "You manage the wireless network at a large company and are installing a new wireless \nsolution. You start by selecting a product that employs encryption that is validated against \nthe FIPS 140 standard. Because of the size of your workforce, you configure the wireless \nsystem to authenticate users with a RADIUS server. Users must provide the wireless system \nwith their domain usernames and passwords to be able to connect, and the RADIUS server \nverifies those credentials. Users unable to authenticate are denied access [a,b].",
    },
    fd_pac: [
      "Is wireless access limited only to authenticated and authorized users (e.g., required to \nsupply a username and password) [a]?",
      "If the organization is securing its wireless network with a pre-shared key, is access to \nthat key restricted to only authorized users [a]?",
      "Is wireless access encrypted using FIPS-validated cryptography? Note that simply using \nan approved algorithm is not sufficient; the module (software and/or hardware) used to \nimplement the algorithm must be separately validated under FIPS 140 [b].9",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.17"],
  },
  {
    id: 20,
    level: 2,
    section: "3.1.18",
    section_name: "MOBILE DEVICE CONNECTION ",
    brief_description: "Control connection of mobile devices. \n",
    assessment_objectives: {
      a: "mobile devices that process, store, or transmit CUI are identified;",
      b: "mobile device connections are authorized; and",
      c: "mobile device connections are monitored and logged.",
    },
    examine:
      "[SELECT FROM: Access control policy; authorizations for mobile device connections to \norganizational systems; procedures addressing access control for mobile device usage \n(including restrictions); system design documentation; configuration management plan; \nsystem security plan; system audit logs and records; system configuration settings and \nassociated documentation; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel using mobile devices to access organizational systems; system or \nnetwork administrators; personnel with information security responsibilities]",
    test: "[SELECT FROM: Access control capability authorizing mobile device connections to \norganizational systems]",
    discussion:
      "A mobile device is a computing device that has a small form factor such that it can easily be \ncarried by a single individual; is designed to operate without a physical connection (e.g., \nwirelessly transmit or receive information); possesses local, non-removable or removable \ndata storage; and includes a self-contained power source. Mobile devices may also include \nvoice communication capabilities, on-board sensors that allow the device to capture \ninformation, or built-in features for synchronizing local data with remote locations. \nExamples of mobile devices include smart phones, e-readers, and tablets. \nDue to the large variety of mobile devices with different technical characteristics and \ncapabilities, organizational restrictions may vary for the different types of devices. Usage \nrestrictions and implementation guidance for mobile devices include: device identification \nand authentication; configuration management; implementation of mandatory protective \nsoftware (e.g., malicious code detection, firewall); scanning devices for malicious code; \nupdating virus protection software; scanning for critical software updates and patches; \nconducting primary operating system (and possibly other resident software) integrity \nchecks; and disabling unnecessary hardware (e.g., wireless, infrared). The need to provide \nadequate security for mobile devices goes beyond this requirement. Many controls for \nmobile devices are reflected in other CUI security requirements. NIST SP 800-124 provides \nguidance on mobile device security.",
    further_discussion:
      "Establish guidelines and acceptable practices for proper configuration, use, and management \nof mobile devices. Devices that process, store, or transmit CUI must be identified with a \ndevice-specific identifier. There are many different types of identifiers, and it is important to \nselect one that can accommodate all devices and be used in a consistent manner. These \nidentifiers are important for facilitating the required monitoring and logging function. \nIn addition to smartphones, consider the security of other portable devices such as e-readers \nand tablets. \nAC.L2-3.1.16, AC.L2-3.1.17, and AC.L2-3.1.18 are complementary practices in that they all \nestablish requirements to control the connection of mobile devices and wireless devices \nthrough the use of authentication, authorization, and encryption mechanisms.",
    fd_examples: {
      Example:
        "Your organization has a policy stating that all mobile devices, including iPads, tablets, mobile \nphones, and Personal Digital Assistants (PDAs), must be approved and registered with the \nIT department before connecting to the network. The IT department uses a Mobile Device \nManagement solution to monitor mobile devices and enforce policies across the enterprise \n[b,c].",
    },
    fd_pac: [
      "Is a list of mobile devices that are permitted to process, store, or transmit CUI maintained \n[a,b]?",
      "Is the system configured to only permit connections from identified, authorized mobile \ndevices [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.18"],
  },
  {
    id: 21,
    level: 2,
    section: "3.1.19",
    section_name: "ENCRYPT CUI ON MOBILE ",
    brief_description:
      "Encrypt CUI on mobile devices and mobile computing platforms. \n",
    assessment_objectives: {
      a: "mobile devices and mobile computing platforms that process, store, or transmit CUI are \nidentified; and",
      b: "encryption is employed to protect CUI on identified mobile devices and mobile \ncomputing platforms.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing access control for mobile \ndevices; system design documentation; system configuration settings and associated \ndocumentation; encryption mechanisms and associated configuration documentation; \nsystem security plan; system audit logs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with access control responsibilities for mobile devices; system or \nnetwork administrators; personnel with information security responsibilities]",
    test: "[SELECT FROM: Encryption mechanisms protecting confidentiality of information on mobile \ndevices]",
    discussion:
      "Organizations can employ full-device encryption or container-based encryption to protect \nthe confidentiality of CUI on mobile devices and computing platforms. Container-based \nencryption provides a more fine-grained approach to the encryption of data and information \nincluding encrypting selected data structures such as files, records, or fields.",
    further_discussion:
      "Ensure CUI is encrypted on all mobile devices and mobile computing platforms that process, \nstore, or transmit CUI including smartphones, tablets, and e-readers. \nWhen CMMC requires cryptography, it is to protect the confidentiality of CUI. FIPS-validated \ncryptography means the cryptographic module has to have been tested and validated to \nmeet FIPS 140-1 or-2 requirements. Simply using an approved algorithm is not sufficient – \nthe module (software and/or hardware) used to implement the algorithm must be \nseparately validated under FIPS 140. Accordingly, FIPS-validated cryptography is required \nto meet CMMC practices that protect CUI when transmitted or stored outside the protected \nenvironment of the covered contractor information system (including wireless/remote \naccess). Encryption used for other purposes, such as within applications or devices within \nthe protected environment of the covered contractor information system, would not need to \nbe FIPS-validated. \nThis practice, AC.L2-3.1.19, requires that CUI be encrypted on mobile devices and extends \nthree other CUI protection practices (MP.L2-3.8.1, MP.L2-3.8.2, and SC.L2-3.13.16):  \n MP.L2-3.8.1 requires that media containing CUI be protected.  \n MP.L2-3.8.2 limits access to CUI to authorized users.  \n Finally, SC.L2-3.13.16 requires confidentiality of CUI at rest.  \nThis practice, AC.L2-3.1.19, also leverages SC.L2-3.13.11, which specifies that the algorithms \nused must be FIPS-validated, and SC.L2-3.13.10, which specifies that any cryptographic keys \nin use must be protected.",
    fd_examples: {
      Example:
        "You are in charge of mobile device security. You configure all laptops to use the full-disk \nencryption technology built into the operating system. This approach is FIPS-validated and \nencrypts all files, folders, and volumes.  \nPhones and tablets pose a greater technical challenge with their wide range of manufacturers \nand operating systems. You select a proprietary mobile device management (MDM) solution \nto enforce FIPS-validated encryption on those devices [a,b].",
    },
    fd_pac: [
      "Is a list maintained of mobile devices and mobile computing platforms that are permitted \nto process, store, or transmit CUI [a]?",
      "Is CUI encrypted on mobile devices using FIPS-validated algorithms [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.19"],
  },
  {
    id: 22,
    level: 2,
    section: "3.1.21",
    section_name: "PORTABLE STORAGE USE ",
    brief_description:
      "Limit use of portable storage devices on external systems. \n",
    assessment_objectives: {
      a: "the use of portable storage devices containing CUI on external systems is identified and \ndocumented;",
      b: "limits on the use of portable storage devices containing CUI on external systems are \ndefined; and",
      c: "the use of portable storage devices containing CUI on external systems is limited as \ndefined.",
    },
    examine:
      "[SELECT FROM: Access control policy; procedures addressing the use of external systems; \nsystem security plan; system configuration settings and associated documentation; system \nconnection or processing agreements; account management documents; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for restricting or prohibiting use of \norganization-controlled storage devices on external systems; system or network \nadministrators; personnel with information security responsibilities]",
    test: "[SELECT FROM: Mechanisms implementing restrictions on use of portable storage devices]",
    discussion:
      'Limits on the use of organization-controlled portable storage devices in external systems \ninclude complete prohibition of the use of such devices or restrictions on how the devices \nmay be used and under what conditions the devices may be used. Note that while “external” \ntypically refers to outside of the organization’s direct supervision and authority that is not \nalways the case. Regarding the protection of CUI across an organization, the organization \nmay have systems that process CUI and others that do not. Among the systems that process \nCUI there are likely access restrictions for CUI that apply between systems. Therefore, from \nthe perspective of a given system, other systems within the organization may be considered \n“external" to that system.',
    further_discussion:
      "A portable storage device is a system component that can be inserted or attached and easily \nremoved from a system. It is used to store data or information.",
    fd_examples: {
      Example:
        "Your organization has a written portable device usage restriction policy. It states that users \ncan only use external storage devices such as thumb dives or external hard disks that belong \nto the company. When needed for a specific business function, a user checks the device out \nfrom IT and returns it to IT when no longer needed [a,b].",
    },
    fd_pac: [
      "Are the portable storage devices authorized for external use identified and documented \n[a]?",
      "Are the circumstances defined in which portable storage devices containing CUI may be \nused on external systems (e.g., with management approval) [b]?",
      "Are limitations stipulated for the use of portable storage devices containing CUI on \nexternal systems (e.g., authorized personnel only, encrypted drives required) [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.1.21-Based Risk Awareness"],
  },
  {
    id: 23,
    level: 2,
    section: "3.2.1",
    section_name: "ROLE-BASED RISK AWARENESS ",
    brief_description:
      "Ensure that managers, systems administrators, and users of organizational systems are \nmade aware of the security risks associated with their activities and of the applicable \npolicies, standards, and procedures related to the security of those systems. \n",
    assessment_objectives: {
      a: "security risks associated with organizational activities involving CUI are identified;",
      b: "policies, standards, and procedures related to the security of the system are identified;",
      c: "managers, systems administrators, and users of the system are made aware of the \nsecurity risks associated with their activities; and",
      d: "managers, systems administrators, and users of the system are made aware of the \napplicable policies, standards, and procedures related to the security of the system.",
    },
    examine:
      "[SELECT FROM: Security awareness and training policy; procedures addressing security \nawareness training implementation; relevant codes of federal regulations; security \nawareness training curriculum; security awareness training materials; system security plan; \ntraining records; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for security awareness training; personnel \nwith information security responsibilities; personnel composing the general system user \ncommunity; personnel with responsibilities for role-based awareness training]",
    test: "[SELECT FROM: Mechanisms managing security awareness training; mechanisms managing \nrole-based security training]",
    discussion:
      "Organizations determine the content and frequency of security awareness training and \nsecurity awareness techniques based on the specific organizational requirements and the \nsystems to which personnel have authorized access. The content includes a basic-Based Risk Awareness \nunderstanding of the need for information security and user actions to maintain security and \nto respond to suspected security incidents. The content also addresses awareness of the \nneed for operations security. Security awareness techniques include: formal training; \noffering supplies inscribed with security reminders; generating email advisories or notices \nfrom organizational officials; displaying logon screen messages; displaying security \nawareness posters; and conducting information security awareness events. \nNIST SP 800-50 provides guidance on security awareness and training programs.",
    further_discussion:
      "Awareness training focuses user attention on security. Several techniques can be used, such \nas:  \n synchronous or asynchronous training;  \n simulations (e.g., simulated phishing emails);  \n security awareness campaigns (posters, reminders, group discussions); and  \n communicating regular email advisories and notices to employees.  \nAwareness training and role-based training are different. This practice, AT.L2-3.2.1, covers \nawareness training, which provides general security training to influence user behavior. This \ntraining can apply broadly or be tailored to a specific role. Role-based training focuses on the \nknowledge, skills, and abilities needed to complete a specific job and is covered by AT.L2-\n3.2.2.",
    fd_examples: {
      Example:
        "You want to provide information to employees so they can identify phishing emails. To do \nthis, you prepare a presentation that highlights basic traits, including: \n suspicious-looking email address or domain name; \n a message that contains an attachment or URL; and \n a message that is poorly written and often contains obvious misspelled words. \nYou encourage everyone to not click on attachments or links in a suspicious email [c]. You \ntell employees to forward such a message immediately to IT security [d]. You download free \nsecurity awareness posters to hang in the office [c,d]. You send regular emails and tips to all \nemployees to ensure your message is not forgotten over time [c,d].",
    },
    fd_pac: [
      "Do all users, managers, and system administrators receive initial and refresher training \ncommensurate with their roles and responsibilities [c,d]?10 \n                                                           \n10 NIST Handbook 162 Section 3.2.1-Based Risk Awareness",
      "Do training materials identify the organizationally defined security requirements that \nmust be met by users while interacting with the system as described in written policies, \nstandards, and procedures [d]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.2.1-Based Training"],
  },
  {
    id: 24,
    level: 2,
    section: "3.2.2",
    section_name: "ROLE-BASED TRAINING ",
    brief_description:
      "Ensure that personnel are trained to carry out their assigned information security-related \nduties and responsibilities. \n",
    assessment_objectives: {
      a: "information security-related duties, roles, and responsibilities are defined;",
      b: "information security-related duties, roles, and responsibilities are assigned to \ndesignated personnel; and",
      c: "personnel are adequately trained to carry out their assigned information security-\nrelated duties, roles, and responsibilities.",
    },
    examine:
      "[SELECT FROM: Security awareness and training policy; procedures addressing security \ntraining implementation; codes of federal regulations; security training curriculum; security \ntraining materials; system security plan; training records; other relevant documents or \nrecords]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for role-based security training; personnel \nwith assigned system security roles and responsibilities; personnel with responsibilities for \nsecurity awareness training; personnel with information security responsibilities; personnel \nrepresenting the general system user community]",
    test: "[SELECT FROM: Mechanisms managing role-based security training; mechanisms managing \nsecurity awareness training]",
    discussion:
      "Organizations determine the content and frequency of security training based on the \nassigned duties, roles, and responsibilities of individuals and the security requirements of \norganizations and the systems to which personnel have authorized access. In addition, \norganizations provide system developers, enterprise architects, security architects, \nacquisition/procurement officials, software developers, system developers, systems \nintegrators, \nsystem/network \nadministrators, \npersonnel \nconducting \nconfiguration \nmanagement and auditing activities, personnel performing independent verification and \nvalidation, security assessors, and other personnel having access to system-level software, \nsecurity-related technical training specifically tailored for their assigned duties.-Based Training \nComprehensive role-based training addresses management, operational, and technical roles \nand responsibilities covering physical, personnel, and technical controls. Such training can \ninclude policies, procedures, tools, and artifacts for the security roles defined. Organizations \nalso provide the training necessary for individuals to carry out their responsibilities related \nto operations and supply chain security within the context of organizational information \nsecurity programs. \nNIST SP 800-181 provides guidance on role-based information security training in the \nworkplace. SP 800-161 provides guidance on supply chain risk management.",
    further_discussion:
      "Training imparts skills and knowledge to enable staff to perform a specific job function. \nTraining should be available to all employees for all organizational roles to accommodate \nrole changes without being constrained by the training schedule. Awareness training and \nrole-based training are different. Awareness training provides general security training to \ninfluence user behavior and is covered by AT.L2-3.2.1. This practice, AT.L2-3.2.2, covers role-\nbased training that focuses on the knowledge, skills, and abilities needed to complete a \nspecific job. Role-based training may include awareness topics specific to individual roles \nsuch as ensuring systems administrators understand the risk associated with using an \nadministrative account.",
    fd_examples: {
      Example:
        "Your company upgraded the firewall to a newer, more advanced system. You have been \nidentified as an employee who needs training on the new device [a,b,c]. This will enable you \nto use the firewall effectively and efficiently. Your company considered training resources \nwhen it planned for the upgrade and ensured that training funds were available as part of \nthe upgrade project [c].",
    },
    fd_pac: [
      "Are the duties, roles, and responsibilities that impact, directly or indirectly, the \ninformation security of the company or its systems defined and documented [a]?",
      "Do information security-related tasks have accountable owners, and is a strictly limited \ngroup of individuals assigned to perform them [b]?",
      "Are personnel who are assigned information security-related duties, roles, and \nresponsibilities trained on those responsibilities, including the security requirements \nunique or inherent to their roles or responsibilities [c]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.2.2"],
  },
  {
    id: 25,
    level: 2,
    section: "3.2.3",
    section_name: "INSIDER THREAT AWARENESS ",
    brief_description:
      "Provide security awareness training on recognizing and reporting potential indicators of \ninsider threat. \n",
    assessment_objectives: {
      a: "potential indicators associated with insider threats are identified; and",
      b: "security awareness training on recognizing and reporting potential indicators of insider \nthreat is provided to managers and employees.",
    },
    examine:
      "[SELECT FROM: Security awareness and training policy; procedures addressing security \nawareness training implementation; security awareness training curriculum; security \nawareness training materials; insider threat policy and procedures; system security plan; \nother relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel that participate in security awareness training; personnel with \nresponsibilities for basic security awareness training; personnel with information security \nresponsibilities]",
    test: "[SELECT FROM: Mechanisms managing insider threat training]",
    discussion:
      "Potential indicators and possible precursors of insider threat include behaviors such as: \ninordinate, long-term job dissatisfaction; attempts to gain access to information that is not \nrequired for job performance; unexplained access to financial resources; bullying or sexual \nharassment of fellow employees; workplace violence; and other serious violations of the \npolicies, procedures, directives, rules, or practices of organizations. Security awareness \ntraining includes how to communicate employee and management concerns regarding \npotential indicators of insider threat through appropriate organizational channels in \naccordance with established organizational policies and procedures. Organizations may \nconsider tailoring insider threat awareness topics to the role (e.g., training for managers may \nbe focused on specific changes in behavior of team members, while training for employees \nmay be focused on more general observations).",
    further_discussion:
      "An insider threat is the threat that an insider will use their authorized access, wittingly or \nunwittingly, to do harm. Insider threat security awareness training focuses on recognizing \nemployee behaviors and characteristics that might be indicators of an insider threat and the \nguidelines and procedures to handle and report it. Training for managers will provide \nguidance on observing team members to identify all potential threat indicators, while \ntraining for general employees will provide guidance for focusing on a smaller number of \nindicators. Employee behaviors will vary depending on roles, team membership, and \nassociated information needs. The person responsible for specifying insider threat \nindicators must be cognizant of these factors. Because of this, organizations may choose to \ntailor the training for specific roles. This practice does not require separate training \nregarding insider threat. Organizations may choose to integrate these topics into their \nstandard security awareness training programs.",
    fd_examples: {
      Example:
        "You are responsible for training all employees on the awareness of high-risk behaviors that \ncan indicate a potential insider threat [b]. You educate yourself on the latest research on \ninsider threat indicators by reviewing a number of law enforcement bulletins [a]. You then \nadd the following example to the training package: A baseline of normal behavior for work \nschedules has been created. One employee’s normal work schedule is 8:00 AM–5:00 PM, but \nanother employee noticed that the employee has been working until 9:00 PM every day even \nthough no projects requiring additional hours have been assigned [b]. The observing \nemployee reports the abnormal work schedule using the established reporting guidelines.",
    },
    fd_pac: [
      "Do training materials include potential indicators associated with insider threats (e.g., \nrepeated security violations, unusual work hours, unexpected significant transfers of \ndata, suspicious contacts, concerning behaviors outside the workplace) [a,b]?",
      "Do training materials include methods of reporting potential indicators of insider threats \nto management or responsible security personnel [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.2.3"],
  },
  {
    id: 26,
    level: 2,
    section: "3.3.1",
    section_name: "SYSTEM AUDITING ",
    brief_description:
      "Create and retain system audit logs and records to the extent needed to enable the \nmonitoring, analysis, investigation, and reporting of unlawful or unauthorized system \nactivity. \n",
    assessment_objectives: {
      a: "audit logs needed (i.e., event types to be logged) to enable the monitoring, analysis, \ninvestigation, and reporting of unlawful or unauthorized system activity are specified;",
      b: "the content of audit records needed to support monitoring, analysis, investigation, and \nreporting of unlawful or unauthorized system activity is defined;",
      c: "audit records are created (generated);",
      d: "audit records, once created, contain the defined content;",
      e: "retention requirements for audit records are defined; and",
      f: "audit records are retained as defined.",
    },
    examine:
      "[SELECT FROM: Audit and accountability policy; procedures addressing auditable events; \nsystem security plan; system design documentation; system configuration settings and \nassociated documentation; procedures addressing control of audit records; procedures \naddressing audit record generation; system audit logs and records; system auditable events; \nsystem incident reports; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with audit and accountability responsibilities; personnel with \ninformation security responsibilities; personnel with audit review, analysis and reporting \nresponsibilities; system or network administrators]",
    test: "[SELECT FROM: Mechanisms implementing system audit logging]",
    discussion:
      "An event is any observable occurrence in a system, which includes unlawful or unauthorized \nsystem activity. Organizations identify event types for which a logging functionality is \nneeded as those events which are significant and relevant to the security of systems and the \nenvironments in which those systems operate to meet specific and ongoing auditing needs. \nEvent types can include password changes, failed logons or failed accesses related to \nsystems, administrative privilege usage, or third-party credential usage. In determining \nevent types that require logging, organizations consider the monitoring and auditing \nappropriate for each of the CUI security requirements. Monitoring and auditing \nrequirements can be balanced with other system needs. For example, organizations may \ndetermine that systems must have the capability to log every file access both successful and \nunsuccessful, but not activate that capability except for specific circumstances due to the \npotential burden on system performance. \nAudit records can be generated at various levels of abstraction, including at the packet level \nas information traverses the network. Selecting the appropriate level of abstraction is a \ncritical aspect of an audit logging capability and can facilitate the identification of root causes \nto problems. Organizations consider in the definition of event types, the logging necessary to \ncover related events such as the steps in distributed, transaction-based processes (e.g., \nprocesses that are distributed across multiple organizations) and actions that occur in \nservice-oriented or cloud-based architectures. \nAudit record content that may be necessary to satisfy this requirement includes time stamps, \nsource and destination addresses, user or process identifiers, event descriptions, success or \nfailure indications, filenames involved, and access control or flow control rules invoked. \nEvent outcomes can include indicators of event success or failure and event-specific results \n(e.g., the security state of the system after the event occurred). \nDetailed information that organizations may consider in audit records includes full text \nrecording of privileged commands or the individual identities of group account users. \nOrganizations consider limiting the additional audit log information to only that information \nexplicitly needed for specific audit requirements. This facilitates the use of audit trails and \naudit logs by not including information that could potentially be misleading or could make it \nmore difficult to locate information of interest. Audit logs are reviewed and analyzed as often \nas needed to provide important information to organizations to facilitate risk-based decision \nmaking. NIST SP 800-92 provides guidance on security log management.",
    further_discussion:
      "Contractors must ensure that all applicable systems create and retain audit logs that contain \nenough information to identify and investigate potentially unlawful or unauthorized system \nactivity. Contractors must define the audit logs it needs to collect as well as the specific \nevents to capture within the selected logs. Captured audit records are checked to verify that \nthey contain the required events. \nIn defining the audit log retention period, contractors must ensure that logs are retained for \na sufficiently long period to allow for the investigation of a security event. The retention \nperiod must take into account the delay of weeks or months that can occur between an initial \ncompromise and the discovery of attacker activity.",
    fd_examples: {
      Example:
        "You set up audit logging capability for your company. You determine that all systems that \ncontain CUI must have extra detail in the audit logs. Because of this, you configure these \nsystems to log the following information for all user actions [b,c]: \n time stamps; \n source and destination addresses; \n user or process identifiers; \n event descriptions; \n success or fail indications; and \n filenames.",
    },
    fd_pac: [
      "Are audit log retention requirements appropriate to the system and its associated level \nof risk [e]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.3.1"],
  },
  {
    id: 27,
    level: 2,
    section: "3.3.2",
    section_name: "USER ACCOUNTABILITY ",
    brief_description:
      "Ensure that the actions of individual system users can be uniquely traced to those users so \nthey can be held accountable for their actions. \n",
    assessment_objectives: {
      a: "the content of the audit records needed to support the ability to uniquely trace users to \ntheir actions is defined; and",
      b: "audit records, once created, contain the defined content.",
    },
    examine:
      "[SELECT FROM: Audit and accountability policy; procedures addressing audit records and \nevent types; system security plan; system design documentation; system configuration \nsettings and associated documentation; procedures addressing audit record generation; \nprocedures addressing audit review, analysis, and reporting; reports of audit findings; \nsystem audit logs and records; system events; system incident reports; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with audit and accountability responsibilities; personnel with \ninformation security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Mechanisms implementing system audit logging]",
    discussion:
      "This requirement ensures that the contents of the audit record include the information \nneeded to link the audit event to the actions of an individual to the extent feasible. \nOrganizations consider logging for traceability including results from monitoring of account \nusage, remote access, wireless connectivity, mobile device connection, communications at \nsystem boundaries, configuration settings, physical access, nonlocal maintenance, use of \nmaintenance tools, temperature and humidity, equipment delivery and removal, system \ncomponent inventory, use of mobile code, and use of VoIP.",
    further_discussion:
      "Capturing the necessary information in audit logs ensures that you can trace actions to a \nspecific user. This may include capturing user IDs, source and destination addresses, and \ntime stamps. Logging from networks, servers, clients, and applications should be considered \nin ensuring accountability. \nThis practice, AU.L2-3.3.2, which ensures logging and traceability of user actions, supports \nthe control of non-privileged users required by AC.L2-3.1.7 as well as many other auditing, \nconfiguration management, incident response, and situation awareness practices.",
    fd_examples: {
      Example:
        "You are a system administrator. You want to ensure that you can trace all remote access \nsessions to a specific user. You configure the VPN device to capture the following information \nfor all remote access connections: source and destination IP address, user ID, machine name, \ntime stamp, and user actions during the remote session [b].",
    },
    fd_pac: [
      "Are users uniquely traced and held responsible for unauthorized actions [a]?",
      "Does the system protect against an individual denying having performed an action (non- \nrepudiation) [b]?11",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.3.2"],
  },
  {
    id: 28,
    level: 2,
    section: "3.3.3",
    section_name: "EVENT REVIEW ",
    brief_description: "Review and update logged events. \n",
    assessment_objectives: {
      a: "a process for determining when to review logged events is defined;",
      b: "event types being logged are reviewed in accordance with the defined review process; \nand",
      c: "event types being logged are updated based on the review.",
    },
    examine:
      "[SELECT FROM: Audit and accountability policy; procedures addressing audit records and \nevent types; system security plan; list of organization-defined event types to be logged; \nreviewed and updated records of logged event types; system audit logs and records; system \nincident reports; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with audit and accountability responsibilities; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Mechanisms supporting review and update of logged event types]",
    discussion:
      "The intent of this requirement is to periodically re-evaluate which logged events will \ncontinue to be included in the list of events to be logged. The event types that are logged by \norganizations may change over time. Reviewing and updating the set of logged event types \nperiodically is necessary to ensure that the current set remains necessary and sufficient.",
    further_discussion:
      "This practice is focused on the configuration of the auditing system, not the review of the \naudit records produced by the selected events. The review of the audit logs is covered under \nAU.L2-3.3.5 and AU.L2-3.3.6.",
    fd_examples: {
      Example:
        "You are in charge of IT operations for your company and are responsible for identifying and \ndocumenting which events are relevant to the security of your company’s systems. Your \ncompany has decided that this list of events should be updated annually or when new \nsecurity threats or events have been identified, which may require additional events to be \nlogged and reviewed [a]. The list of events you are capturing in your logs started as the list \nof recommended events given by the manufacturers of your operating systems and devices, \nbut it has grown from experience. \nYour company experiences a security incident, and a forensics review shows the logs appear \nto have been deleted by a remote user. You notice that remote sessions are not currently \nbeing logged [b]. You update the list of events to include logging all VPN sessions [c].",
    },
    fd_pac: [
      "Do documented processes include methods for determining when to review logged event \ntypes (i.e., regular frequency, after incidents, after major system changes) [a]?",
      "Do documented processes include methods for reviewing event types being logged (i.e., \nbased on specific threat, use case, retention capacity, current utilization, and/or newly \nadded system component or functionality) [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.3.3"],
  },
  {
    id: 29,
    level: 2,
    section: "3.3.4",
    section_name: "AUDIT FAILURE ALERTING ",
    brief_description:
      "Alert in the event of an audit logging process failure. \n",
    assessment_objectives: {
      a: "personnel or roles to be alerted in the event of an audit logging process failure are \nidentified;",
      b: "types of audit logging process failures for which alert will be generated are defined; and",
      c: "identified personnel or roles are alerted in the event of an audit logging process failure.",
    },
    examine:
      "[SELECT FROM: Audit and accountability policy; procedures addressing response to audit \nlogging processing failures; system design documentation; system security plan; system \nconfiguration settings and associated documentation; list of personnel to be notified in case \nof an audit logging processing failure; system incident reports; system audit logs and \nrecords; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with audit and accountability responsibilities; personnel with \ninformation security responsibilities; system or network administrators; system \ndevelopers]",
    test: "[SELECT FROM: Mechanisms implementing system response to audit logging process \nfailures]",
    discussion:
      "Audit logging process failures include software and hardware errors, failures in the audit \nrecord capturing mechanisms, and audit record storage capacity being reached or exceeded. \nThis requirement applies to each audit record data storage repository (i.e., distinct system \ncomponent where audit records are stored), the total audit record storage capacity of \norganizations (i.e., all audit record data storage repositories combined), or both.",
    further_discussion:
      "Audit logging keeps track of activities occurring on the network, servers, user workstations, \nand other components of the overall system. These logs must always be available and \nfunctional. The company’s designated security personnel (e.g., system administrator and \nsecurity officer) need to be aware when the audit log process fails or becomes unavailable \n[a]. Notifications (e.g., email, Short Message Service (SMS)) should to be sent to the \ncompany’s designated security personnel to immediately take appropriate action. If security \npersonnel are unaware of the audit logging process failure, then they will be unaware of any \nsuspicious activity occurring at that time. Response to an audit logging process failure should \naccount for the extent of the failure (e.g., a single component’s audit logging versus failure of \nthe centralized logging solution), the risks involved in this loss of audit logging, and other \nfactors (e.g., the possibility that an adversary could have caused the audit logging process \nfailure).",
    fd_examples: {
      Example:
        "You are in charge of IT operations for your company, and your responsibilities include \nmanaging the audit logging process. You configure your systems to send you an email in the \nevent of an audit log failure. One day, you receive one of these alerts. You connect to the \nsystem, restart logging, and determine why the logging stopped [a,b,c].",
    },
    fd_pac: [
      "Will the system alert personnel with security responsibilities in the event of an audit \nprocessing failure?12",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.3.4"],
  },
  {
    id: 30,
    level: 2,
    section: "3.3.5",
    section_name: "AUDIT CORRELATION ",
    brief_description:
      "Correlate audit record review, analysis, and reporting processes for investigation and \nresponse to indications of unlawful, unauthorized, suspicious, or unusual activity. \n",
    assessment_objectives: {
      a: "audit record review, analysis, and reporting processes for investigation and response to \nindications of unlawful, unauthorized, suspicious, or unusual activity are defined; and",
      b: "defined audit record review, analysis, and reporting processes are correlated.",
    },
    examine:
      "[SELECT FROM: Audit and accountability policy; procedures addressing audit record review, \nanalysis, and reporting; system security plan; system design documentation; system \nconfiguration settings and associated documentation; procedures addressing investigation \nof and response to suspicious activities; system audit logs and records across different \nrepositories; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with audit record review, analysis, and reporting responsibilities; \npersonnel with information security responsibilities]",
    test: "[SELECT FROM: Mechanisms supporting analysis and correlation of audit records; \nmechanisms integrating audit review, analysis and reporting]",
    discussion:
      "Correlating audit record review, analysis, and reporting processes helps to ensure that they \ndo not operate independently, but rather collectively. Regarding the assessment of a given \norganizational system, the requirement is agnostic as to whether this correlation is applied \nat the system level or at the organization level across all systems.",
    further_discussion:
      "Companies must review, analyze, and report audit records to help detect and respond to \nsecurity incidents in a timely manner for the purpose of investigation and corrective actions. \nCollection of audit logs into one or more central repositories may facilitate correlated review. \nSmall companies may be able to accomplish this manually with well-defined and -managed \nprocedures. Larger companies will use an automated system for analysis that correlates log \ndata from across the entire enterprise. Some companies may want to orchestrate the analysis \nprocess to include the use of Application Programming Interfaces (APIs) for collection, \ncorrelation, and the automation of responses based on programed rulesets.",
    fd_examples: {
      Example:
        "You are a member of a cyber defense team responsible for audit log analysis. You run an \nautomated tool that analyzes all the audit logs across a Local Area Network (LAN) segment \nsimultaneously looking for similar anomalies on separate systems at separate locations. \nAfter extracting anomalous information and performing a correlation analysis [b], you \ndetermine that four different systems have had their event log information cleared between \n2:00 AM to 3:00 AM, although the associated dates are different. The team monitors all \nsystems on the same LAN segment between 2:00 AM to 3:00 AM for the next 30 days.",
    },
    fd_pac: [
      "Are mechanisms used across different repositories to integrate audit review, analysis, \ncorrelation, and reporting processes [b]?13",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.3.5"],
  },
  {
    id: 31,
    level: 2,
    section: "3.3.6",
    section_name: "REDUCTION & REPORTING ",
    brief_description:
      "Provide audit record reduction and report generation to support on-demand analysis and \nreporting. \n",
    assessment_objectives: {
      a: "an audit record reduction capability that supports on-demand analysis is provided; and",
      b: "a report generation capability that supports on-demand reporting is provided.",
    },
    examine:
      "[SELECT FROM: Audit and accountability policy; procedures addressing audit record \nreduction and report generation; system design documentation; system security plan; \nsystem configuration settings and associated documentation; audit record reduction, \nreview, analysis, and reporting tools; system audit logs and records; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with audit record reduction and report generation \nresponsibilities; personnel with information security responsibilities]",
    test: "[SELECT FROM: Audit record reduction and report generation capability]",
    discussion:
      "Audit record reduction is a process that manipulates collected audit information and \norganizes such information in a summary format that is more meaningful to analysts. Audit \nrecord reduction and report generation capabilities do not always emanate from the same \nsystem or organizational entities conducting auditing activities. Audit record reduction \ncapability can include, for example, modern data mining techniques with advanced data \nfilters to identify anomalous behavior in audit records. The report generation capability \nprovided by the system can help generate customizable reports. Time ordering of audit \nrecords can be a significant issue if the granularity of the time stamp in the record is \ninsufficient.",
    further_discussion:
      "Raw audit log data is difficult to review, analyze, and report because of the volume of data. \nAudit record reduction is an automated process that interprets raw audit log data and \nextracts meaningful and relevant information without altering the original logs. An example & Reporting \nof log reduction for files to be analyzed would be the removal of details associated with \nnightly backups. Report generation on reduced log information allows you to create succinct \ncustomized reports without the need to burden the reader with unimportant information. In \naddition, the security-relevant audit information must be made available to personnel on \ndemand for immediate review, analysis, reporting, and event investigation support. \nPerforming audit log reduction and providing on-demand reports may allow the analyst to \ntake mitigating action before an adversary completes its malicious actions.",
    fd_examples: {
      Example:
        "You are in charge of IT operations in your company. You are responsible for providing audit \nrecord reduction and report generation capability. To support this function, you deploy an \nopen-source solution that will collect and analyze data for signs of anomalies. The solution \nqueries your central log repository to extract relevant data and provide you with a concise \nand comprehensive view for further analysis to identify potentially malicious activity [a]. In \naddition to creating on-demand data sets for analysis, you create customized reports \nexplaining the contents of the data set [b].",
    },
    fd_pac: [
      "Does the system support on-demand audit review, analysis, and reporting requirements \nand after-the-fact security investigations [b]?14",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.3.6"],
  },
  {
    id: 32,
    level: 2,
    section: "3.3.7",
    section_name: "AUTHORITATIVE TIME SOURCE ",
    brief_description:
      "Provide a system capability that compares and synchronizes internal system clocks with an \nauthoritative source to generate time stamps for audit records. \n",
    assessment_objectives: {
      a: "internal system clocks are used to generate time stamps for audit records;",
      b: "an authoritative source with which to compare and synchronize internal system clocks \nis specified; and",
      c: "internal system clocks used to generate time stamps for audit records are compared to \nand synchronized with the specified authoritative time source.",
    },
    examine:
      "[SELECT FROM: Audit and accountability policy; procedures addressing time stamp \ngeneration; system design documentation; system security plan; system configuration \nsettings and associated documentation; system audit logs and records; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with information security responsibilities; system or network \nadministrators; system developers]",
    test: "[SELECT FROM: Mechanisms implementing time stamp generation; mechanisms \nimplementing internal information system clock synchronization]",
    discussion:
      "Internal system clocks are used to generate time stamps, which include date and time. Time \nis expressed in Coordinated Universal Time (UTC), a modern continuation of Greenwich \nMean Time (GMT), or local time with an offset from UTC. The granularity of time \nmeasurements refers to the degree of synchronization between system clocks and reference \nclocks, for example, clocks synchronizing within hundreds of milliseconds or within tens of \nmilliseconds. Organizations may define different time granularities for different system \ncomponents. Time service can also be critical to other security capabilities such as access \ncontrol and identification and authentication, depending on the nature of the mechanisms \nused to support those capabilities. This requirement provides uniformity of time stamps for \nsystems with multiple system clocks and systems connected over a network.",
    further_discussion:
      "Each system must synchronize its time with a central time server to ensure that all systems \nare recording audit logs using the same time source. Reviewing audit logs from multiple \nsystems can be a difficult task if time is not synchronized. Systems can be synchronized to a \nnetwork device or directory service or configured manually.",
    fd_examples: {
      Example:
        "You are setting up several new computers on your company’s network. You update the time \nsettings on each machine to use the same authoritative time server on the internet [b,c]. \nWhen you review audit logs, all your machines will have synchronized time, which aids in \nany potential security investigations.",
    },
    fd_pac: [
      "Can the records’ time stamps map to Coordinated Universal Time (UTC), compare system \nclocks with authoritative Network Time Protocol (NTP) servers, and synchronize system \nclocks when the time difference is greater than 1 second [c]?15",
      "Does the system synchronize internal system clocks on a defined frequency [c]?16",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.3.7"],
  },
  {
    id: 33,
    level: 2,
    section: "3.3.8",
    section_name: "AUDIT PROTECTION ",
    brief_description:
      "Protect audit information and audit logging tools from unauthorized access, modification, \nand deletion. \n",
    assessment_objectives: {
      a: "audit information is protected from unauthorized access;",
      b: "audit information is protected from unauthorized modification;",
      c: "audit information is protected from unauthorized deletion;",
      d: "audit logging tools are protected from unauthorized access;",
      e: "audit logging tools are protected from unauthorized modification; and",
      f: "audit logging tools are protected from unauthorized deletion.",
    },
    examine:
      "[SELECT FROM: Audit and accountability policy; access control policy and procedures; \nprocedures addressing protection of audit information; system security plan; system design \ndocumentation; system configuration settings and associated documentation, system audit \nlogs and records; audit logging tools; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with audit and accountability responsibilities; personnel with \ninformation security responsibilities; system or network administrators; system \ndevelopers]",
    test: "[SELECT FROM: Mechanisms implementing audit information protection]",
    discussion:
      "Audit information includes all information (e.g., audit records, audit log settings, and audit \nreports) needed to successfully audit system activity. Audit logging tools are those programs \nand devices used to conduct audit and logging activities. This requirement focuses on the \ntechnical protection of audit information and limits the ability to access and execute audit \nlogging tools to authorized individuals. Physical protection of audit information is addressed \nby media protection and physical and environmental protection requirements.",
    further_discussion:
      "Audit information is a critical record of what events occurred, the source of the events, and \nthe outcomes of the events; this information needs to be protected. The logs must be \nproperly secured so that the information may not be modified or deleted, either intentionally \nor unintentionally. Only those with a legitimate need-to-know should have access to audit \ninformation, whether that information is being accessed directly from logs or from audit \ntools.",
    fd_examples: {
      Example:
        "You are in charge of IT operations in your company. Your responsibilities include protecting \naudit information and audit logging tools. You protect the information from modification or \ndeletion by having audit log events forwarded to a central server and by restricting the local \naudit logs to only be viewable by the system administrators [a,b,c]. Only a small group of \nsecurity professionals can view the data on the central audit server [b,c,d]. For an additional \nlayer of protection, you back up the server daily and encrypt the backups before sending \nthem to a cloud data repository [a,b,c].",
    },
    fd_pac: [
      "Is there a list of authorized users for audit systems and tools [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.3.8"],
  },
  {
    id: 34,
    level: 2,
    section: "3.3.9",
    section_name: "AUDIT MANAGEMENT ",
    brief_description:
      "Limit management of audit logging functionality to a subset of privileged users. \n",
    assessment_objectives: {
      a: "a subset of privileged users granted access to manage audit logging functionality is \ndefined; and",
      b: "management of audit logging functionality is limited to the defined subset of privileged \nusers.",
    },
    examine:
      "[SELECT FROM: Audit and accountability policy; access control policy and procedures; \nprocedures addressing protection of audit information; system security plan; system design \ndocumentation; system configuration settings and associated documentation; access \nauthorizations; system-generated list of privileged users with access to management of audit \nlogging functionality; access control list; system audit logs and records; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with audit and accountability responsibilities; personnel with \ninformation security responsibilities; system or network administrators; system \ndevelopers]",
    test: "[SELECT FROM: Mechanisms managing access to audit logging functionality]",
    discussion:
      "Individuals with privileged access to a system and who are also the subject of an audit by \nthat system, may affect the reliability of audit information by inhibiting audit logging \nactivities or modifying audit records. This requirement specifies that privileged access be \nfurther defined between audit-related privileges and other privileges, thus limiting the users \nwith audit-related privileges.",
    further_discussion:
      "Companies should restrict access to audit logging functions to a limited number of privileged \nusers who can modify audit logs and audit settings. General users should not be granted \npermissions to perform audit management. All audit managers should be privileged users, \nbut only a small subset of privileged users will be given audit management responsibilities. \nFunctions performed by privileged users must be distinctly separate from the functions \nperformed by users who have audit-related responsibilities to reduce the potential of \nfraudulent activities by privileged users not being detected or reported. When possible, \nindividuals who manage audit logs should not have access to other privileged functions.",
    fd_examples: {
      Example:
        "You are a junior system administrator responsible for the administration of select company \ninfrastructure, but you are not responsible for managing audit information. You are not \npermitted to review audit logs, delete audit logs, or modify audit log settings [b]. Full control \nof audit logging functions has been given to senior system administrators [a,b]. This \nseparation of system administration duties from audit logging management is necessary to \nprevent possible log file tampering.",
    },
    fd_pac: [
      "Are audit records of nonlocal accesses to privileged accounts and the execution of \nprivileged functions protected [b]?17",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.3.9"],
  },
  {
    id: 35,
    level: 2,
    section: "3.4.1",
    section_name: "SYSTEM BASELINING ",
    brief_description:
      "Establish and maintain baseline configurations and inventories of organizational systems \n(including hardware, software, firmware, and documentation) throughout the respective \nsystem development life cycles. \n",
    assessment_objectives: {
      a: "a baseline configuration is established;",
      b: "the baseline configuration includes hardware, software, firmware, and documentation;",
      c: "the baseline configuration is maintained (reviewed and updated) throughout the \nsystem development life cycle;",
      d: "a system inventory is established;",
      e: "the system inventory includes hardware, software, firmware, and documentation; and",
      f: "the inventory is maintained (reviewed and updated) throughout the system \ndevelopment life cycle.",
    },
    examine:
      "[SELECT FROM: Configuration management policy; procedures addressing the baseline \nconfiguration of the system; procedures addressing system inventory; system security plan; \nconfiguration management plan; system inventory records; inventory review and update \nrecords; enterprise architecture documentation; system design documentation; system \narchitecture and configuration documentation; system configuration settings and associated \ndocumentation; change control records; system component installation records; system \ncomponent removal records; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with configuration management responsibilities; personnel with \nresponsibilities for establishing the system inventory; personnel with responsibilities for \nupdating the system inventory; personnel with information security responsibilities; system \nor network administrators]",
    test: "[SELECT FROM: Organizational processes for managing baseline configurations; \nmechanisms supporting configuration control of the baseline configuration; organizational \nprocesses for developing and documenting an inventory of system components; \norganizational processes for updating inventory of system components; mechanisms \nsupporting or implementing the system inventory; mechanisms implementing updating of \nthe system inventory]",
    discussion:
      "This requirement establishes and maintains baseline configurations for systems and system \ncomponents including for system communications and connectivity. Baseline configurations \nare documented, formally reviewed, and agreed-upon sets of specifications for systems or \nconfiguration items within those systems. Baseline configurations serve as a basis for future \nbuilds, releases, and changes to systems. Baseline configurations include information about \nsystem components (e.g., standard software packages installed on workstations, notebook \ncomputers, servers, network components, or mobile devices; current version numbers and \nupdate and patch information on operating systems and applications; and configuration \nsettings and parameters), network topology, and the logical placement of those components \nwithin the system architecture. Baseline configurations of systems also reflect the current \nenterprise architecture. Maintaining effective baseline configurations requires creating new \nbaselines as organizational systems change over time. Baseline configuration maintenance \nincludes reviewing and updating the baseline configuration when changes are made based \non security risks and deviations from the established baseline configuration. \nOrganizations can implement centralized system component inventories that include \ncomponents from multiple organizational systems. In such situations, organizations ensure \nthat the resulting inventories include system-specific information required for proper \ncomponent accountability (e.g., system association, system owner). Information deemed \nnecessary for effective accountability of system components includes hardware inventory \nspecifications, software license information, software version numbers, component owners, \nand for networked components or devices, machine names and network addresses. \nInventory specifications include manufacturer, device type, model, serial number, and \nphysical location. \nNIST SP 800-128 provides guidance on security-focused configuration management.",
    further_discussion:
      "An effective cybersecurity program depends on consistent, secure system and component \nconfiguration and management. Build and configure systems from a known, secure, and \napproved configuration baseline. This includes: \n documenting the software and configuration settings of a system; \n placement within the network; and \n other specifications as required by the organization.",
    fd_examples: {
      Example:
        "You are in charge of upgrading the computer operating systems of your office’s computers. \nYou research how to set up and configure a workstation with the least functionality and \nhighest security and use that as the framework for creating a configuration that minimizes \nfunctionality while still allowing users to do their tasks. After testing the new baseline on a \nsingle workstation, you document this configuration and apply it to the other computers [a]. \nYou then check to make sure that the software changes are accurately reflected in your \nmaster system inventory [e]. Finally, you set a calendar reminder to review the baseline in \nthree months [f].",
    },
    fd_pac: [
      "Do baseline configurations include software versions and patch level, configuration \nparameters, network information, and communications with connected systems [a,b]?18",
      "Are baseline configurations updated as needed to accommodate security risks or \nsoftware changes [c]?19",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.4.1"],
  },
  {
    id: 36,
    level: 2,
    section: "3.4.2",
    section_name: "SECURITY CONFIGURATION ENFORCEMENT ",
    brief_description:
      "Establish and enforce security configuration settings for information technology products \nemployed in organizational systems. \n",
    assessment_objectives: {
      a: "security configuration settings for information technology products employed in the \nsystem are established and included in the baseline configuration; and",
      b: "security configuration settings for information technology products employed in the \nsystem are enforced.",
    },
    examine:
      "[SELECT FROM: Configuration management policy; baseline configuration; procedures \naddressing configuration settings for the system; configuration management plan; system \nsecurity plan; system design documentation; system configuration settings and associated \ndocumentation; security configuration checklists; evidence supporting approved deviations \nfrom established configuration settings; change control records; system audit logs and \nrecords; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with security configuration management responsibilities; \npersonnel with information security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Organizational processes for managing configuration settings; mechanisms \nthat implement, monitor, and/or control system configuration settings; mechanisms that \nidentify and/or document deviations from established configuration settings; processes for \nmanaging baseline configurations; mechanisms supporting configuration control of baseline \nconfigurations]",
    discussion:
      "Configuration settings are the set of parameters that can be changed in hardware, software, \nor firmware components of the system that affect the security posture or functionality of the \nsystem. Information technology products for which security-related configuration settings \ncan be defined include mainframe computers, servers, workstations, input and output \ndevices (e.g., scanners, copiers, and printers), network components (e.g., firewalls, routers, \ngateways, voice and data switches, wireless access points, network appliances, sensors), \noperating systems, middleware, and applications. \nSecurity parameters are those parameters impacting the security state of systems including \nthe parameters required to satisfy other security requirements. Security parameters include: \nregistry settings; account, file, directory permission settings; and settings for functions, \nports, protocols, and remote connections. Organizations establish organization-wide \nconfiguration settings and subsequently derive specific configuration settings for systems. \nThe established settings become part of the systems configuration baseline. \nCommon secure configurations (also referred to as security configuration checklists, \nlockdown and hardening guides, security reference guides, security technical \nimplementation guides) provide recognized, standardized, and established benchmarks that \nstipulate \nsecure \nconfiguration \nsettings \nfor \nspecific \ninformation \ntechnology \nplatforms/products and instructions for configuring those system components to meet \noperational requirements. Common secure configurations can be developed by a variety of \norganizations including information technology product developers, manufacturers, \nvendors, consortia, academia, industry, federal agencies, and other organizations in the \npublic and private sectors. \nNIST SP 800-70 and SP 800-128 provide guidance on security configuration settings.",
    further_discussion:
      "Information security is an integral part of a company’s configuration management process. \nSecurity-related configuration settings are customized to satisfy the company’s security \nrequirements and are applied them to all systems once tested and approved. The \nconfiguration settings must reflect the most restrictive settings that are appropriate for the \nsystem. Any required deviations from the baseline are reviewed, documented, and approved.",
    fd_examples: {
      Example:
        "You manage baseline configurations for your company’s systems. As part of this, you \ndownload a secure configuration guide for each of your asset types (servers, workstations, \nnetwork components, operating systems, middleware, and applications) from a well-known \nand trusted IT security organization. You then apply all of the settings that you can while still \nensuring the assets can perform the role for which they are needed. Once you have the \nconfiguration settings identified and tested, you document them to ensure all applicable \nmachines can be configured the same way [a,b].",
    },
    fd_pac: [
      "Do security settings reflect the most restrictive settings appropriate [a]?20",
      "Are changes or deviations to security settings documented [b]?21",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.4.2"],
  },
  {
    id: 37,
    level: 2,
    section: "3.4.3",
    section_name: "SYSTEM CHANGE MANAGEMENT ",
    brief_description:
      "Track, review, approve or disapprove, and log changes to organizational systems. \n",
    assessment_objectives: {
      a: "changes to the system are tracked;",
      b: "changes to the system are reviewed;",
      c: "changes to the system are approved or disapproved; and",
      d: "changes to the system are logged.",
    },
    examine:
      "[SELECT FROM: Configuration management policy; procedures addressing system \nconfiguration change control; configuration management plan; system architecture and \nconfiguration documentation; system security plan; change control records; system audit \nlogs and records; change control audit and review reports; agenda/minutes from \nconfiguration change control oversight meetings; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with configuration change control responsibilities; personnel \nwith information security responsibilities; system or network administrators; members of \nchange control board or similar]",
    test: "[SELECT FROM: Organizational processes for configuration change control; mechanisms that \nimplement configuration change control]",
    discussion:
      "Tracking, reviewing, approving/disapproving, and logging changes is called configuration \nchange control. Configuration change control for organizational systems involves the \nsystematic proposal, justification, implementation, testing, review, and disposition of \nchanges to the systems, including system upgrades and modifications. Configuration change \ncontrol includes changes to baseline configurations for components and configuration items \nof systems, changes to configuration settings for information technology products (e.g., \noperating systems, applications, firewalls, routers, and mobile devices), unscheduled and \nunauthorized changes, and changes to remediate vulnerabilities. \nProcesses for managing configuration changes to systems include Configuration Control \nBoards or Change Advisory Boards that review and approve proposed changes to systems. \nFor new development systems or systems undergoing major upgrades, organizations \nconsider including representatives from development organizations on the Configuration \nControl Boards or Change Advisory Boards. Audit logs of changes include activities before \nand after changes are made to organizational systems and the activities required to \nimplement such changes. \nNIST SP 800-128 provides guidance on configuration change control.",
    further_discussion:
      "You must track, review, and approve configuration changes before committing to \nproduction. Changes to computing environments can create unintended and unforeseen \nissues that can affect the security and availability of the systems. Relevant experts and \nstakeholders must review and approve proposed changes. They should discuss potential \nimpacts before the organization puts the changes in place. Relevant items include changes to \nthe physical environment and to the systems hosted within it.",
    fd_examples: {
      Example:
        "Once a month, the management and technical team leads join a change control board \nmeeting. During this meeting, everyone reviews all proposed changes to the environment \n[b,c]. This includes changes to the physical and computing environments. The meeting \nensures that relevant subject-matter experts review changes and propose alternatives \nwhere needed.",
    },
    fd_pac: [
      "Are changes to the system authorized by company management and documented \n[a,b,c,d]?22",
      "Are changes documented and tracked (e.g., manually written down or included in a \ntracking service such as a ticketing system) [d]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.4.3"],
  },
  {
    id: 38,
    level: 2,
    section: "3.4.4",
    section_name: "SECURITY IMPACT ANALYSIS ",
    brief_description:
      "Analyze the security impact of changes prior to implementation. \n",
    assessment_objectives: {
      a: "the security impact of changes to the system is analyzed prior to implementation.",
    },
    examine:
      "[SELECT FROM: Configuration management policy; procedures addressing security impact \nanalysis for system changes; configuration management plan; security impact analysis \ndocumentation; system security plan; analysis tools and associated outputs; change control \nrecords; system audit logs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with responsibility for conducting security impact analysis; \npersonnel with information security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Organizational processes for security impact analysis]",
    discussion:
      "Organizational personnel with information security responsibilities (e.g., system \nadministrators, system security officers, system security managers, and systems security \nengineers) conduct security impact analyses. Individuals conducting security impact \nanalyses possess the necessary skills and technical expertise to analyze the changes to \nsystems and the associated security ramifications. Security impact analysis may include \nreviewing security plans to understand security requirements and reviewing system design \ndocumentation to understand the implementation of controls and how specific changes \nmight affect the controls. Security impact analyses may also include risk assessments to \nbetter understand the impact of the changes and to determine if additional controls are \nrequired. \nNIST SP 800-128 provides guidance on configuration change control and security impact \nanalysis.",
    further_discussion:
      "Changes to complex environments are reviewed for potential security impact before \nimplemented. Changes to IT systems can cause unforeseen problems and have unintended \nconsequences for both users and the security of the operating environment. Analyze the \nsecurity impact of changes prior to implementing them. This can uncover and mitigate \npotential problems before they occur.",
    fd_examples: {
      Example:
        "You have been asked to deploy a new web browser plug-in. Your standard change \nmanagement process requires that you produce a detailed plan for the change, including a \nreview of its potential security impact. A subject-matter expert who did not submit the \nchange reviews the plan and tests the new plug-in for functionality and security. You update \nthe change plan based on the expert’s findings and submit it to the change control board for \nfinal approval [a].",
    },
    fd_pac: [
      "Are configuration changes tested, validated, and documented before installing them on \nthe operational system [a]?23",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.4.4"],
  },
  {
    id: 39,
    level: 2,
    section: "3.4.5",
    section_name: "ACCESS RESTRICTIONS FOR CHANGE ",
    brief_description:
      "Define, document, approve, and enforce physical and logical access restrictions associated \nwith changes to organizational systems. \n",
    assessment_objectives: {
      a: "physical access restrictions associated with changes to the system are defined;",
      b: "physical access restrictions associated with changes to the system are documented;",
      c: "physical access restrictions associated with changes to the system are approved;",
      d: "physical access restrictions associated with changes to the system are enforced;",
      e: "logical access restrictions associated with changes to the system are defined;",
      f: "logical access restrictions associated with changes to the system are documented;",
      g: "logical access restrictions associated with changes to the system are approved; and",
      h: "logical access restrictions associated with changes to the system are enforced.",
    },
    examine:
      "[SELECT FROM: Configuration management policy; procedures addressing access \nrestrictions for changes to the system; system security plan; configuration management \nplan; system design documentation; system architecture and configuration documentation; \nsystem configuration settings and associated documentation; logical access approvals; \nphysical access approvals; access credentials; change control records; system audit logs and \nrecords; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with logical access control responsibilities; personnel with \nphysical \naccess \ncontrol \nresponsibilities; \npersonnel \nwith \ninformation \nsecurity \nresponsibilities; system or network administrators]",
    test: "[SELECT FROM: Organizational processes for managing access restrictions associated with \nchanges to the system; mechanisms supporting, implementing, and enforcing access \nrestrictions associated with changes to the system]",
    discussion:
      "Any changes to the hardware, software, or firmware components of systems can potentially \nhave significant effects on the overall security of the systems. Therefore, organizations \npermit only qualified and authorized individuals to access systems for purposes of initiating \nchanges, including upgrades and modifications. Access restrictions for change also include \nsoftware libraries. Access restrictions include physical and logical access control \nrequirements, workflow automation, media libraries, abstract layers (e.g., changes \nimplemented into external interfaces rather than directly into systems), and change \nwindows (e.g., changes occur only during certain specified times). In addition to security \nconcerns, commonly-accepted due diligence for configuration management includes access \nrestrictions as an essential part in ensuring the ability to effectively manage the \nconfiguration. \nNIST SP 800-128 provides guidance on configuration change control.",
    further_discussion:
      "Define, identify, and document qualified individuals authorized to make physical and logical \nchanges to the organization’s hardware, software, software libraries, or firmware \ncomponents. Control of configuration management activities may involve: \n physical access control that prohibits unauthorized users from gaining physical access to \nan asset (e.g., requiring a special key card to enter a server room); \n logical access control that prevents unauthorized users from logging onto a system to \nmake configuration changes (e.g., requiring specific credentials for modifying \nconfiguration settings, patching software, or updating software libraries); \n workflow automation in which configuration management workflow rules define human \ntasks and data or files are routed between people authorized to do configuration \nmanagement based on pre-defined business rules (e.g., passing an electronic form to a \nmanager requesting approval of configuration change made by an authorized employee); \n an abstraction layer for configuration management that requires changes be made from \nan external system through constrained interface (e.g., software updates can only be \nmade from a patch management system with a specific IP address); and \n utilization of a configuration management change window (e.g., software updates are \nonly allowed between 8:00 AM and 10:00 AM or between 6:00 PM and 8:00 PM).",
    fd_examples: {
      Example:
        "Your datacenter requires expanded storage capacity in a server. The change has been \napproved, and security is planning to allow an external technician to access the building at a \nspecific date and time under the supervision of a manager [a,b,c,d]. A system administrator \ncreates a temporary privileged account that can be used to log into the server’s operating \nsystem and update storage settings [e,f,g]. On the appointed day, the technician is escorted \ninto the datacenter, upgrades the hardware, expands the storage in the operating system \n(OS), and departs. The manager verifies the upgrade and disables the privileged account [h].",
    },
    fd_pac: [
      "Are only employees who are approved to make physical or logical changes on systems \nallowed to do so [a,d,e,h]?24",
      "Are authorized personnel approved and documented by the service owner and IT \nsecurity [a,e]?25",
      "Does all change documentation include the name of the authorized employee making the \nchange [b,d,f,h]?26",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.4.5"],
  },
  {
    id: 40,
    level: 2,
    section: "3.4.6",
    section_name: "LEAST FUNCTIONALITY ",
    brief_description:
      "Employ the principle of least functionality by configuring organizational systems to provide \nonly essential capabilities. \n",
    assessment_objectives: {
      a: "essential system capabilities are defined based on the principle of least functionality; \nand",
      b: "the system is configured to provide only the defined essential capabilities.",
    },
    examine:
      "[SELECT FROM: Configuration management policy; configuration management plan; \nprocedures addressing least functionality in the system; system security plan; system design \ndocumentation; system configuration settings and associated documentation; security \nconfiguration checklists; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with security configuration management responsibilities; \npersonnel with information security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Organizational processes prohibiting or restricting functions, ports, \nprotocols, or services; mechanisms implementing restrictions or prohibition of functions, \nports, protocols, or services]",
    discussion:
      "Systems can provide a wide variety of functions and services. Some of the functions and \nservices routinely provided by default, may not be necessary to support essential \norganizational missions, functions, or operations. It is sometimes convenient to provide \nmultiple services from single system components. However, doing so increases risk over \nlimiting the services provided by any one component. Where feasible, organizations limit \ncomponent functionality to a single function per component. \nOrganizations review functions and services provided by systems or components of systems, \nto determine which functions and services are candidates for elimination. Organizations \ndisable unused or unnecessary physical and logical ports and protocols to prevent \nunauthorized connection of devices, transfer of information, and tunneling. Organizations \ncan utilize network scanning tools, intrusion detection and prevention systems, and end- \npoint protections such as firewalls and host-based intrusion detection systems to identify \nand prevent the use of prohibited functions, ports, protocols, and services.",
    further_discussion:
      "You should customize organizational systems to remove non-essential applications and \ndisable unnecessary services. Systems come with many unnecessary applications and \nsettings enabled by default including unused ports and protocols. Leave only the fewest \ncapabilities necessary for the systems to operate effectively.",
    fd_examples: {
      Example:
        "You have ordered a new server, which has arrived with a number of free utilities installed in \naddition to the operating system. Before you deploy the server, you research the utilities to \ndetermine which ones can be eliminated without impacting functionality. You remove the \nunneeded software, then move on to disable unused ports and services. The server that \nenters production therefore has only the essential capabilities enabled for the system to \nfunction in its role [a,b].",
    },
    fd_pac: [
      "Are the roles and functions for each system identified along with the software and \nservices required to perform those functions [a]?",
      "Are the software and services required for those defined functions identified [a]?",
      "Is the information system configured to exclude any function not needed in the \noperational environment [b]?27",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.4.6"],
  },
  {
    id: 41,
    level: 2,
    section: "3.4.7",
    section_name: "NONESSENTIAL FUNCTIONALITY ",
    brief_description:
      "Restrict, disable, or prevent the use of nonessential programs, functions, ports, protocols, \nand services. \n",
    assessment_objectives: {
      a: "essential programs are defined;",
      b: "the use of nonessential programs is defined;",
      c: "the use of nonessential programs is restricted, disabled, or prevented as defined;",
      d: "essential functions are defined;",
      e: "the use of nonessential functions is defined;",
      f: "the use of nonessential functions is restricted, disabled, or prevented as defined;",
      g: "essential ports are defined;",
      h: "the use of nonessential ports is defined;",
      i: "the use of nonessential ports is restricted, disabled, or prevented as defined;",
      j: "essential protocols are defined;",
      k: "the use of nonessential protocols is defined;",
      l: "the use of nonessential protocols is restricted, disabled, or prevented as defined;",
      m: "essential services are defined;",
      n: "the use of nonessential services is defined; and",
      o: "the use of nonessential services is restricted, disabled, or prevented as defined.",
    },
    examine:
      "[SELECT FROM: Configuration management policy; procedures addressing least \nfunctionality in the system; configuration management plan; system security plan; system \ndesign documentation; security configuration checklists; system configuration settings and \nassociated documentation; specifications for preventing software program execution; \ndocumented reviews of programs, functions, ports, protocols, and/or services; change \ncontrol records; system audit logs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for reviewing programs, functions, ports, \nprotocols, and services on the system; personnel with information security responsibilities; \nsystem or network administrators; system developers]",
    test: "[SELECT FROM: Organizational processes for reviewing and disabling nonessential \nprograms, functions, ports, protocols, or services; mechanisms implementing review and \nhandling of nonessential programs, functions, ports, protocols, or services; organizational \nprocesses preventing program execution on the system; organizational processes for \nsoftware program usage and restrictions; mechanisms supporting or implementing software \nprogram usage and restrictions; mechanisms preventing program execution on the system]",
    discussion:
      "Restricting the use of nonessential software (programs) includes restricting the roles \nallowed to approve program execution; prohibiting auto-execute; program blacklisting and \nwhitelisting; or restricting the number of program instances executed at the same time. The \norganization makes a security-based determination which functions, ports, protocols, \nand/or services are restricted. Bluetooth, File Transfer Protocol (FTP), and peer-to-peer \nnetworking are examples of protocols organizations consider preventing the use of, \nrestricting, or disabling.",
    further_discussion:
      "Organizations should only use the minimum set of programs, services, ports, and protocols \nrequired for to accomplish the organization’s mission. This has several implications: \n All unnecessary programs and accounts are removed from all endpoints and servers. \n The organization makes a policy decision to control the execution of programs through \neither whitelisting or blacklisting. Whitelisting means a program can only run if the \nsoftware has been vetted in some way, and the executable name has been entered onto a \nlist of allowed software. Blacklisting means any software can execute as long it is not on \na list of known malicious software. Whitelisting provides far more security than \nblacklisting, but the organization’s policy can direct the implementation of either \napproach. Control of execution applies to both servers and endpoints. \n The organization restricts the use of all unnecessary ports, protocols, and system services \nin order to limit entry points that attackers can use. For example, the use of the FTP \nservice is eliminated from all computers, and the associated ports are blocked unless a \nrequired service utilizes those ports. The elimination of nonessential functionality on the \nnetwork and systems provides a smaller attack surface for an attacker to gain access and \ntake control of your network or systems. \nThis practice, CM.L2-3.4.7, which requires limiting functionality to essential programs, ports, \nprotocols, and services, extends CM.L2-3.4.6, which requires adherence to the principle of \nleast functionality but does not specifically address which elements of a system should be \nlimited.",
    fd_examples: {
      Example:
        "You are responsible for purchasing new endpoint hardware, installing organizationally \nrequired software to the hardware, and configuring the endpoint in accordance with the \norganization’s policy. The organization has a system imaging capability that loads all \nnecessary software, but it does not remove unnecessary services, eliminate the use of certain \nprotocols, or close unused ports. After imaging the systems, you close all ports and block the \nuse of all protocols except the following: \n TCP for SSH on port 22; \n SMTP on port 25; \n TCP and UDP on port 53; and \n HTTP and HTTPS on port 443. \nThe use of any other ports or protocols are allowed by exception only [i,l,o].",
    },
    fd_pac: [
      "Are only applications and services that are needed for the function of the system \nconfigured and enabled [a,b,c,d,e,f]?28",
      "Are only those ports and protocols necessary to provide the service of the information \nsystem configured for that system [g,h,i,j,k,l]?29",
      "Are systems services reviewed to determine what is essential for the function of that \nsystem [m]?30",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.4.7"],
  },
  {
    id: 42,
    level: 2,
    section: "3.4.8",
    section_name: "APPLICATION EXECUTION POLICY ",
    brief_description:
      "Apply deny-by-exception (blacklisting) policy to prevent the use of unauthorized software \nor deny-all, permit-by-exception (whitelisting) policy to allow the execution of authorized \nsoftware. \n",
    assessment_objectives: {
      a: "a policy specifying whether whitelisting or blacklisting is to be implemented is \nspecified;",
      b: "the software allowed to execute under whitelisting or denied use under blacklisting is \nspecified; and",
      c: "whitelisting to allow the execution of authorized software or blacklisting to prevent the \nuse of unauthorized software is implemented as specified.",
    },
    examine:
      "[SELECT FROM: Configuration management policy; procedures addressing least \nfunctionality in the system; system security plan; configuration management plan; system \ndesign documentation; system configuration settings and associated documentation; list of \nsoftware programs not authorized to execute on the system; list of software programs \nauthorized to execute on the system; security configuration checklists; review and update \nrecords associated with list of authorized or unauthorized software programs; change \ncontrol records; system audit logs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for identifying software authorized or not \nauthorized to execute on the system; personnel with information security responsibilities; \nsystem or network administrators]",
    test: "[SELECT FROM: Organizational process for identifying, reviewing, and updating programs \nauthorized or not authorized to execute on the system; process for implementing blacklisting \nor whitelisting; mechanisms supporting or implementing blacklisting or whitelisting]",
    discussion:
      "The process used to identify software programs that are not authorized to execute on \nsystems is commonly referred to as blacklisting. The process used to identify software \nprograms that are authorized to execute on systems is commonly referred to as whitelisting. \nWhitelisting is the stronger of the two policies for restricting software program execution. \nIn addition to whitelisting, organizations consider verifying the integrity of whitelisted \nsoftware programs using, for example, cryptographic checksums, digital signatures, or hash \nfunctions. Verification of whitelisted software can occur either prior to execution or at \nsystem startup. \nNIST SP 800-167 provides guidance on application whitelisting.",
    further_discussion:
      "Organizations should determine their blacklisting or whitelisting policy and configure the \nsystem to manage software that is allowed to run. Blacklisting or deny-by-exception allows \nall software to run except if on an unauthorized software list such as what is maintained in \nantivirus solutions. Whitelisting or permit-by-exception does not allow any software to run \nexcept if on an authorized software list. The stronger policy of the two is whitelisting. \nThis practice, CM.L2-3.4.8, requires the implementation of allow-lists and deny-lists for \napplication software. It leverages CM.L2-3.4.1, which requires the organization to establish \nand maintain software inventories.  \nThis practice, CM.L2-3.4.8, also extends CM.L2-3.4.9, which only requires control and \nmonitoring of any user installed software.",
    fd_examples: {
      Example:
        "To improve your company’s protection from malware, you have decided to allow only \ndesignated programs to run. With additional research you identify a capability within the \nlatest operating system that can control executables, scripts, libraries, or application \ninstallers run in your environment [c]. To ensure success you begin by authorizing digitally \nsigned executables. Once they are deployed, you then plan to evaluate and deploy \nwhitelisting for software libraries and scripts [c].",
    },
    fd_pac: [
      "Is the information system configured to only allow authorized software to run [a,b,c]?31",
      "Is the system configured to disallow running unauthorized software [a,b,c]?32",
      "Is there a defined list of software programs authorized to execute on the system [b]?33",
      "Is the authorization policy a deny-all, permit by exception for software allowed to execute \non the system [a,b,c]?34",
      "Are automated mechanisms used to prevent program execution in accordance with \ndefined lists (e.g., white listing) [a,b,c]?35 \n                                                           \n31 NIST Handbook 162 Section 3.4.8 \n32 NIST Handbook 162 Section 3.4.8 \n33 NIST Handbook 162 Section 3.4.8 \n34 NIST Handbook 162 Section 3.4.8 \n35 NIST Handbook 162 Section 3.4.8",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.4.8-Installed Software"],
  },
  {
    id: 43,
    level: 2,
    section: "3.4.9",
    section_name: "USER-INSTALLED SOFTWARE ",
    brief_description: "Control and monitor user-installed software. \n",
    assessment_objectives: {
      a: "a policy for controlling the installation of software by users is established;",
      b: "installation of software by users is controlled based on the established policy; and",
      c: "installation of software by users is monitored.",
    },
    examine:
      "[SELECT FROM: Configuration management policy; procedures addressing user installed \nsoftware; configuration management plan; system security plan; system design \ndocumentation; system configuration settings and associated documentation; list of rules \ngoverning user-installed software; system monitoring records; system audit logs and \nrecords; continuous monitoring strategy; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with responsibilities for governing user-installed software; \npersonnel operating, using, or maintaining the system; personnel monitoring compliance \nwith user-installed software policy; personnel with information security responsibilities; \nsystem or network administrators]",
    test: "[SELECT FROM: Organizational processes governing user-installed software on the system; \nmechanisms enforcing rules or methods for governing the installation of software by users; \nmechanisms monitoring policy compliance]",
    discussion:
      "Users can install software in organizational systems if provided the necessary privileges. To \nmaintain control over the software installed, organizations identify permitted and \nprohibited actions regarding software installation through policies. Permitted software \ninstallations include updates and security patches to existing software and applications from \norganization-approved “app stores.” Prohibited software installations may include software \nwith unknown or suspect pedigrees or software that organizations consider potentially \nmalicious. The policies organizations select governing user-installed software may be \norganization-developed or provided by some external entity. Policy enforcement methods \ninclude procedural methods, automated methods, or both.-Installed Software",
    further_discussion:
      "Software that users have the ability to install is limited to items that the organization \napproves. When not controlled, users could install software that can create unnecessary risk. \nThis risk applies both to the individual machine and to the larger operating environment. \nPolicies and technical controls reduce risk to the organization by preventing users from \ninstalling unauthorized software.",
    fd_examples: {
      Example:
        "You are a system administrator. A user calls you for help installing a software package. They \nare receiving a message asking for a password because they do not have permission to install \nthe software. You explain that the policy prohibits users from installing software without \napproval [a]. When you set up workstations for users, you do not provide administrative \nprivileges. After the call, you redistribute the policy to all users ensuring everyone in the \ncompany is aware of the restrictions.",
    },
    fd_pac: [
      "Are user controls in place to prohibit the installation of unauthorized software [a]?36",
      "Is all software in use on the information systems approved [b]?37",
      "Is there a mechanism in place to monitor the types of software a user is permitted to \ndownload (e.g., is there a white list of approved software) [c]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.4.9"],
  },
  {
    id: 44,
    level: 1,
    section: "3.5.1",
    section_name: "IDENTIFICATION ",
    brief_description:
      "Identify information system users, processes acting on behalf of users, or devices. \n",
    assessment_objectives: {
      a: "system users are identified;",
      b: "processes acting on behalf of users are identified; and",
      c: "devices accessing the system are identified.",
    },
    examine:
      "[SELECT FROM: Identification and authentication policy; procedures addressing user \nidentification and authentication; system security plan, system design documentation; \nsystem configuration settings and associated documentation; system audit logs and records; \nlist of system accounts; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with system operations responsibilities; personnel with \ninformation security responsibilities; system or network administrators; personnel with \naccount management responsibilities; system developers]",
    test: "[SELECT FROM: Organizational processes for uniquely identifying and authenticating users; \nmechanisms supporting or implementing identification and authentication capability]",
    discussion:
      "Common device identifiers include media access control (MAC), Internet Protocol (IP) \naddresses, or device-unique token identifiers. Management of individual identifiers is not \napplicable to shared system accounts. Typically, individual identifiers are the user names \nassociated with the system accounts assigned to those individuals. Organizations may \nrequire unique identification of individuals in group accounts or for detailed accountability \nof individual activity. In addition, this requirement addresses individual identifiers that are \nnot necessarily associated with system accounts. Organizational devices requiring \nidentification may be defined by type, by device, or by a combination of type/device. NIST SP \n800-63-3 provides guidance on digital identities.",
    further_discussion:
      "Make sure to assign individual, unique identifiers (e.g., user names) to all users and \nprocesses that access company systems. Authorized devices also should have unique \nidentifiers. Unique identifiers can be as simple as a short set of alphanumeric characters (e.g., \nSW001 could refer to a network switch, SW002 could refer to a different network switch).  \nThis practice, IA.L1-3.5.1, provides a vetted and trusted identity that supports the access \ncontrol mechanism required by AC.L1-3.1.1.",
    fd_examples: {
      Example:
        "You want to make sure that all employees working on a project can access important \ninformation about it. Because this is work for the DoD and may contain FCI, you also need to \nprevent employees who are not working on that project from being able to access the \ninformation. You assign each employee is assigned a unique user ID, which they use to log \ninto the system [a].",
    },
    fd_pac: [
      "Are unique identifiers issued to individual users (e.g., usernames) [a]?",
      "Are the processes and service accounts that an authorized user initiates identified (e.g., \nscripts, automatic updates, configuration updates, vulnerability scans) [b]?",
      "Are unique device identifiers used for devices that access the system identified [c]?",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.v",
      "NIST SP 800-171 Rev 2 3.5.1",
    ],
  },
  {
    id: 45,
    level: 1,
    section: "3.5.2",
    section_name: "AUTHENTICATION ",
    brief_description:
      "Authenticate (or verify) the identities of those users, processes, or devices, as a prerequisite \nto allowing access to organizational information systems. \n",
    assessment_objectives: {
      a: "the identity of each user is authenticated or verified as a prerequisite to system access;",
      b: "the identity of each process acting on behalf of a user is authenticated or verified as a \nprerequisite to system access; and",
      c: "the identity of each device accessing or connecting to the system is authenticated or \nverified as a prerequisite to system access.",
    },
    examine:
      "[SELECT FROM: Identification and authentication policy; system security plan; procedures \naddressing authenticator management; procedures addressing user identification and \nauthentication; system design documentation; list of system authenticator types; system \nconfiguration settings and associated documentation; change control records associated \nwith managing system authenticators; system audit logs and records; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with authenticator management responsibilities; personnel with \ninformation security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Mechanisms supporting or implementing authenticator management \ncapability]",
    discussion:
      "Individual authenticators include the following: passwords, key cards, cryptographic \ndevices, and one-time password devices. Initial authenticator content is the actual content \nof the authenticator, for example, the initial password. In contrast, the requirements about \nauthenticator content include the minimum password length. Developers ship system \ncomponents with factory default authentication credentials to allow for initial installation \nand configuration. Default authentication credentials are often well known, easily \ndiscoverable, and present a significant security risk. \nSystems support authenticator management by organization-defined settings and \nrestrictions for various authenticator characteristics including minimum password length, \nvalidation time window for time synchronous one-time tokens, and number of allowed \nrejections during the verification stage of biometric authentication. Authenticator \nmanagement includes issuing and revoking, when no longer needed, authenticators for \ntemporary access such as that required for remote maintenance. Device authenticators \ninclude certificates and passwords. \nNIST SP 800-63-3 provides guidance on digital identities.",
    further_discussion:
      "Before you let a person or a device have access to your system, verify that the user or device \nis who or what it claims to be. This verification is called authentication. The most common \nway to verify identity is using a username and a hard-to-guess password. \nSome devices ship with default usernames and passwords. For example, some devices ship \nso that when you first log on to the device, the username is “admin” and the password is \n“admin”. When you have devices with this type of default username and password, \nimmediately change the default password to a unique password you create. Default \npasswords may be well known to the public, easily found in a search, or easy to guess, \nallowing an unauthorized person to access your system.",
    fd_examples: {
      "Example 1":
        "You are in charge of purchasing. You know that some laptops come with a default username \nand password. You notify IT that all default passwords should be reset prior to laptop use \n[a]. You ask IT to explain the importance of resetting default passwords and convey how \neasily they are discovered using internet searches during next week’s cybersecurity \nawareness training.",
      "Example 2":
        "Your company decides to use cloud services for email and other capabilities. Upon reviewing \nthis practice, you realize every user or device that connects to the cloud service must be \nauthenticated. As a result, you work with your cloud service provider to ensure that only \nproperly authenticated users and devices are allowed to connect to the system [a,c].",
    },
    fd_pac: [
      "Are unique authenticators used to verify user identities (e.g., passwords) [a]?",
      "An example of a process acting on behalf of users could be a script that logs in as a person \nor service account [b]. Can the contractor show that it maintains a record of all of those \nservice accounts for use when reviewing log data or responding to an incident?",
      "Are user credentials authenticated in system processes (e.g., credentials binding, \ncertificates, tokens) [b]?",
      "Are device identifiers used in authentication processes (e.g., MAC address, non-\nanonymous computer name, certificates) [c]?",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.vi",
      "NIST SP 800-171 Rev 2 3.5.2",
    ],
  },
  {
    id: 46,
    level: 2,
    section: "3.5.3",
    section_name: "MULTIFACTOR AUTHENTICATION ",
    brief_description:
      "Use multifactor authentication for local and network access to privileged accounts and for \nnetwork access to non-privileged accounts. \n",
    assessment_objectives: {
      a: "privileged accounts are identified;",
      b: "multifactor authentication is implemented for local access to privileged accounts;",
      c: "multifactor authentication is implemented for network access to privileged accounts; \nand",
      d: "multifactor authentication is implemented for network access to non-privileged \naccounts.",
    },
    examine:
      "[SELECT FROM: Identification and authentication policy; procedures addressing user \nidentification and authentication; system security plan; system design documentation; \nsystem configuration settings and associated documentation; system audit logs and records; \nlist of system accounts; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with authenticator management responsibilities; personnel with \ninformation security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Mechanisms supporting or implementing authenticator management \ncapability]",
    discussion:
      "Multifactor authentication requires the use of two or more different factors to authenticate. \nThe factors are defined as something you know (e.g., password, personal identification \nnumber [PIN]); something you have (e.g., cryptographic identification device, token); or \nsomething you are (e.g., biometric). Multifactor authentication solutions that feature \nphysical authenticators include hardware authenticators providing time-based or challenge-\nresponse authenticators and smart cards. In addition to authenticating users at the system \nlevel (i.e., at logon), organizations may also employ authentication mechanisms at the \napplication level, when necessary, to provide increased information security. Access to \norganizational systems is defined as local access or network access. Local access is any access \nto organizational systems by users (or processes acting on behalf of users) where such access \nis obtained by direct connections without the use of networks. Network access is access to \nsystems by users (or processes acting on behalf of users) where such access is obtained \nthrough network connections (i.e., nonlocal accesses). Remote access is a type of network \naccess that involves communication through external networks. The use of encrypted virtual \nprivate networks for connections between organization-controlled and non-organization \ncontrolled endpoints may be treated as internal networks with regard to protecting the \nconfidentiality of information. \nNIST SP 800-63-3 provides guidance on digital identities.",
    further_discussion:
      "Implement a combination of two or more factors of authentication to verify privileged \naccount holders’ identity regardless of how the user is accessing the account. Implement a \ncombination of two or more factors for non-privileged users accessing the system over a \nnetwork. \nThe implementation of multi-factor authentication will depend on the environment and \nbusiness needs. Although two-factor authentication directly on the computer is most \ncommon, there are situations (e.g., multi-factor identification for a mission system that \ncannot be altered) where additional technical or physical solutions can provide security. \nMultifactor authentication is not required for access to mobile devices such as smartphones \nor tablets – which are not considered to be network devices or information systems. \nThis practice, IA.L2-3.5.3, requires multifactor authentication for network access to non-\nprivileged accounts and complements five other practices dealing with remote access \n(AC.L2-3.1.12, AC.L2-3.1.14, AC.L2-3.1.13, AC.L2-3.1.15, and MA.L2-3.7.5:  \n AC.L2-3.1.12 requires the control of remote access sessions.  \n AC.L2-3.1.14 limits remote access to specific access control points.  \n AC.L2-3.1.13 requires the use of cryptographic mechanisms when enabling remote \nsessions.  \n AC.L2-3.1.15 requires authorization for privileged commands executed during a remote.  \n Finally, MA.L2-3.7.5 requires the addition of multifactor authentication for remote \nmaintenance sessions. \nThis practice, IA.L2-3.5.3, also enhances IA.L1-3.5.2, which is a requirement for a less \nrigorous form of user authentication.",
    fd_examples: {
      Example:
        "You decide to implement multifactor authentication (MFA) to improve security of your \nnetwork. Your first step is enabling MFA on VPN access to your internal network [c,d]. When \nusers initiate remote access, they will be prompted for the additional authentication factor. \nBecause you also use a cloud-based email solution, you require MFA for access to that \nresource as well [c,d]. Finally, you enable MFA for both local and network logins for the \nsystem administrator accounts used to patch and manage servers [a,b,c].",
    },
    fd_pac: [
      "Does the system uniquely identify and authenticate users, including privileged accounts \n[b,c,d]?38",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.5.3"],
  },
  {
    id: 47,
    level: 2,
    section: "3.5.4",
    section_name: "REPLAY-RESISTANT AUTHENTICATION ",
    brief_description:
      "Employ replay-resistant authentication mechanisms for network access to privileged and \nnon-privileged accounts. \n",
    assessment_objectives: {
      a: "replay-resistant authentication mechanisms are implemented for network account \naccess to privileged and non-privileged accounts.",
    },
    examine:
      "[SELECT FROM: Identification and authentication policy; procedures addressing user \nidentification and authentication; system security plan; system design documentation; \nsystem configuration settings and associated documentation; system audit logs and records; \nlist of privileged system accounts; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with system operations responsibilities; personnel with account \nmanagement responsibilities; personnel with information security responsibilities; system \nor network administrators; system developers]",
    test: "[SELECT FROM: Mechanisms supporting or implementing identification and authentication \ncapability or replay resistant authentication mechanisms]",
    discussion:
      "Authentication processes resist replay attacks if it is impractical to successfully authenticate \nby recording or replaying previous authentication messages. Replay-resistant techniques \ninclude protocols that use nonces or challenges such as time synchronous or challenge-\nresponse one-time authenticators. \nNIST SP 800-63-3 provides guidance on digital identities.",
    further_discussion:
      "When insecure protocols are used for access to computing resources, an adversary may be \nable to capture login information and immediately reuse (replay) it for other purposes. It is \nimportant to use mechanisms that resist this technique.-Resistant Authentication",
    fd_examples: {
      Example:
        "To protect your IT infrastructure, you understand that the methods for authentication must \nnot be easily copied and re-sent to your systems by an adversary. You select Kerberos for \nauthentication because of its built-in resistance to replay attacks. As a next step you upgrade \nall of your web applications to require Transport Layer Security (TLS), which also is replay-\nresistant. Your use of MFA to protect remote access also confers some replay resistance.",
    },
    fd_pac: ["Are only anti-replay authentication mechanisms used [a]?39"],
    key_references: ["NIST SP 800-171 Rev 2 3.5.4"],
  },
  {
    id: 48,
    level: 2,
    section: "3.5.5",
    section_name: "IDENTIFIER REUSE ",
    brief_description: "Prevent reuse of identifiers for a defined period. \n",
    assessment_objectives: {
      a: "a period within which identifiers cannot be reused is defined; and",
      b: "reuse of identifiers is prevented within the defined period.",
    },
    examine:
      "[SELECT FROM: Identification and authentication policy; system security plan; procedures \naddressing authenticator management; procedures addressing user identification and \nauthentication; system design documentation; list of system authenticator types; system \nconfiguration settings and associated documentation; change control records associated \nwith managing system authenticators; system audit logs and records; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with authenticator management responsibilities; personnel with \ninformation security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Mechanisms supporting or implementing authenticator management \ncapability]",
    discussion:
      "Identifiers are provided for users, processes acting on behalf of users, or devices (IA.L1-\n3.5.1). Preventing reuse of identifiers implies preventing the assignment of previously used \nindividual, group, role, or device identifiers to different individuals, groups, roles, or devices.",
    further_discussion:
      "Identifiers uniquely associate a user ID to an individual, group, role, or device. Establish \nguidelines and implement mechanisms to prevent identifiers from being reused for the \nperiod of time established in the policy.",
    fd_examples: {
      Example:
        "As a system administrator, you maintain a central directory/domain that holds the accounts \nfor users, computers, and network devices. As part of your job, you issue unique usernames \n(e.g., riley@acme.com) for the staff to access resources. When you issue staff computers you \nalso rename the computer to reflect to whom it is assigned (e.g., riley-laptop01). Riley has \nrecently left the organization, so you must manage the former staff member’s account. \nIncidentally, their replacement is also named Riley. In the directory, you do not assign the \nprevious account to the new user, as policy has defined an identifier reuse period of 24 \nmonths [a]. In accordance with policy, you create an account called riley02 [b]. This account \nis assigned the appropriate permissions for the new user. A new laptop is also provided with \nthe identifier of riley02-laptop01.",
    },
    fd_pac: [
      "Are accounts uniquely assigned to employees, contractors, and subcontractors [b]?40",
      "Are account identifiers reused [b]?41",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.5.5"],
  },
  {
    id: 49,
    level: 2,
    section: "3.5.6",
    section_name: "IDENTIFIER HANDLING ",
    brief_description:
      "Disable identifiers after a defined period of inactivity. \n",
    assessment_objectives: {
      a: "a period of inactivity after which an identifier is disabled is defined; and",
      b: "identifiers are disabled after the defined period of inactivity.",
    },
    examine:
      "[SELECT FROM: Identification and authentication policy; procedures addressing identifier \nmanagement; procedures addressing account management; system security plan; system \ndesign documentation; system configuration settings and associated documentation; list of \nsystem accounts; list of identifiers generated from physical access control devices; other \nrelevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with identifier management responsibilities; personnel with \ninformation security responsibilities; system or network administrators; system \ndevelopers]",
    test: "[SELECT FROM: Mechanisms supporting or implementing identifier management]",
    discussion:
      "Inactive identifiers pose a risk to organizational information because attackers may exploit \nan inactive identifier to gain undetected access to organizational devices. The owners of the \ninactive accounts may not notice if unauthorized access to the account has been obtained.",
    further_discussion:
      "Identifiers are uniquely associated with an individual, account, process, or device. An \ninactive identifier is one that has not been used for a defined extended period of time. For \nexample, a user account may be needed for a certain time to allow for transition of business \nprocesses to existing or new staff. Once use of the identifier is no longer necessary, it should \nbe disabled as soon as possible. Failure to maintain awareness of accounts that are no longer \nneeded yet still active could allow an adversary to exploit IT services.",
    fd_examples: {
      Example:
        "One of your responsibilities is to enforce your company’s inactive account policy: any \naccount that has not been used in the last 45 days must be disabled [a]. You enforce this by \nwriting a script that runs once a day to check the last login date for each account and \ngenerates a report of the accounts with no login records for the last 45 days. After reviewing \nthe report, you notify each inactive employee’s supervisor and disable the account [b].",
    },
    fd_pac: [
      "Are user accounts or identifiers monitored for inactivity [b]?42",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.5.6"],
  },
  {
    id: 50,
    level: 2,
    section: "3.5.7",
    section_name: "PASSWORD COMPLEXITY ",
    brief_description:
      "Enforce a minimum password complexity and change of characters when new passwords \nare created. \n",
    assessment_objectives: {
      a: "password complexity requirements are defined;",
      b: "password change of character requirements are defined;",
      c: "minimum password complexity requirements as defined are enforced when new \npasswords are created; and",
      d: "minimum password change of character requirements as defined are enforced when \nnew passwords are created.",
    },
    examine:
      "[SELECT FROM: Identification and authentication policy; password policy; procedures \naddressing authenticator management; system security plan; system configuration settings \nand associated documentation; system design documentation; password configurations and \nassociated documentation; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with authenticator management responsibilities; personnel with \ninformation security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Mechanisms supporting or implementing authenticator management \ncapability]",
    discussion:
      "This requirement applies to single-factor authentication of individuals using passwords as \nindividual or group authenticators, and in a similar manner, when passwords are used as \npart of multifactor authenticators. The number of changed characters refers to the number \nof changes required with respect to the total number of positions in the current password. \nTo mitigate certain brute force attacks against passwords, organizations may also consider \nsalting passwords.",
    further_discussion:
      "Password complexity means using different types of characters as well as a specified number \nof characters. This applies to both the creation of new passwords and the modification of \nexisting passwords. Characters to manage complexity include numbers, lowercase and \nuppercase letters, and symbols. Minimum complexity requirements are left up to the \norganization to define. Define the lowest level of password complexity required. Define the \nnumber of characters that must be changed when an existing password is changed. Enforce \nthese rules for all passwords. Salting passwords adds a string of random characters (salt) to \na password prior to hashing. This ensures the randomness of the resulting hash value.",
    fd_examples: {
      Example:
        "You work with management to define password complexity rules and ensure they are listed \nin the company’s security policy. You define and enforce a minimum number of characters \nfor each password and ensure that a certain number of characters must be changed when \nupdating passwords [a,b]. Characters include numbers, lowercase and uppercase letters, and \nsymbols [a]. These rules help create hard-to-guess passwords, which help to secure your \nnetwork.",
    },
    fd_pac: [
      "Is a degree of complexity specified for passwords, (e.g., are account passwords a \nminimum of 12 characters and a mix of upper/lower case, numbers, and special \ncharacters), including minimum requirements for each type [a,b,c]?",
      "Is a change of characters required when new passwords are created [d]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.5.7"],
  },
  {
    id: 51,
    level: 2,
    section: "3.5.8",
    section_name: "PASSWORD REUSE ",
    brief_description:
      "Prohibit password reuse for a specified number of generations. \n",
    assessment_objectives: {
      a: "the number of generations during which a password cannot be reused is specified and",
      b: "reuse of passwords is prohibited during the specified number of generations.",
    },
    examine:
      "[SELECT FROM: Identification and authentication policy; password policy; procedures \naddressing authenticator management; system security plan; system design documentation; \nsystem configuration settings and associated documentation; password configurations and \nassociated documentation; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with authenticator management responsibilities; personnel with \ninformation security responsibilities; system or network administrators; system \ndevelopers]",
    test: "[SELECT FROM: Mechanisms supporting or implementing password-based authenticator \nmanagement capability]",
    discussion:
      "Password lifetime restrictions do not apply to temporary passwords.",
    further_discussion:
      "Individuals may not reuse their passwords for a defined period of time and a set number of \npasswords generated.",
    fd_examples: {
      Example:
        "You explain in your company’s security policy that changing passwords regularly provides \nincreased security by reducing the ability of adversaries to exploit stolen or purchased \npasswords over an extended period. You define how often individuals can reuse their \npasswords and the minimum number of password generations before reuse [a]. If a user \ntries to reuse a password before the number of password generations has been exceeded, an \nerror message is generated, and the user is required to enter a new password [b].",
    },
    fd_pac: [
      "How many generations of password changes need to take place before a password can \nbe reused [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.5.8"],
  },
  {
    id: 52,
    level: 2,
    section: "3.5.9",
    section_name: "TEMPORARY PASSWORDS ",
    brief_description:
      "Allow temporary password use for system logons with an immediate change to a permanent \npassword. \n",
    assessment_objectives: {
      a: "an immediate change to a permanent password is required when a temporary password \nis used for system logon.",
    },
    examine:
      "[SELECT FROM: Identification and authentication policy; password policy; procedures \naddressing authenticator management; system security plan; system configuration settings \nand associated documentation; system design documentation; password configurations and \nassociated documentation; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with authenticator management responsibilities; personnel with \ninformation security responsibilities; system or network administrators; system \ndevelopers]",
    test: "[SELECT FROM: Mechanisms supporting or implementing password-based authenticator \nmanagement capability]",
    discussion:
      "Changing temporary passwords to permanent passwords immediately after system logon \nensures that the necessary strength of the authentication mechanism is implemented at the \nearliest opportunity, reducing the susceptibility to authenticator compromises.",
    further_discussion:
      "Users must change their temporary passwords the first time they log in. Temporary \npasswords often follow a consistent style within an organization and can be more easily \nguessed than passwords created by the unique user. This approach to temporary passwords \nshould be avoided.",
    fd_examples: {
      Example:
        "One of your duties as a systems administrator is to create accounts for new users. You \nconfigure all systems with user accounts to require users to change a temporary password \nupon initial login to a permanent password [a]. When a user logs on for the first time, they \nare prompted to create a unique password that meets all of the defined complexity rules.",
    },
    fd_pac: [
      "Are temporary passwords only valid to allow a user to perform a password reset [a]?",
      "Does the system enforce an immediate password change after logon when a temporary \npassword is issued [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.5.9-Protected Passwords"],
  },
  {
    id: 53,
    level: 2,
    section: "3.5.10",
    section_name: "CRYPTOGRAPHICALLY-PROTECTED PASSWORDS ",
    brief_description:
      "Store and transmit only cryptographically-protected passwords. \n",
    assessment_objectives: {
      a: "passwords are cryptographically protected in storage; and",
      b: "passwords are cryptographically protected in transit.",
    },
    examine:
      "[SELECT FROM: Identification and authentication policy; system security plan; procedures \naddressing authenticator management; procedures addressing user identification and \nauthentication; system design documentation; list of system authenticator types; system \nconfiguration settings and associated documentation; change control records associated \nwith managing system authenticators; system audit logs and records; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with authenticator management responsibilities; personnel with \ninformation security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Mechanisms supporting or implementing authenticator management \ncapability]",
    discussion:
      "Cryptographically-protected passwords use salted one-way cryptographic hashes of \npasswords. \nSee NIST Cryptographic Standards and Guidelines.",
    further_discussion:
      "All passwords must be cryptographically protected using a one-way function for storage and \ntransmission. This type of protection changes passwords into another form, or a hashed \npassword. A one-way transformation makes it theoretically impossible to turn the hashed \npassword back into the original password, but inadequate complexity (IA.L2-3.5.7) may still \nfacilitate offline cracking of hashes.-Protected Passwords",
    fd_examples: {
      Example:
        "You are responsible for managing passwords for your organization. You protect all \npasswords with a one-way transformation, or hashing, before storing them. Passwords are \nnever transmitted across a network unencrypted [a,b].",
    },
    fd_pac: [
      "Are passwords prevented from being stored in reversible encryption form in any \ncompany systems [a]?43",
      "Are passwords stored as one-way hashes constructed from passwords [a]?44",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.5.10"],
  },
  {
    id: 54,
    level: 2,
    section: "3.5.11",
    section_name: "OBSCURE FEEDBACK ",
    brief_description: "Obscure feedback of authentication information. \n",
    assessment_objectives: {
      a: "authentication information is obscured during the authentication process.",
    },
    examine:
      "[SELECT FROM: Identification and authentication policy; procedures addressing \nauthenticator feedback; system security plan; system design documentation; system \nconfiguration settings and associated documentation; system audit logs and records; other \nrelevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with information security responsibilities; system or network \nadministrators; system developers]",
    test: "[SELECT FROM: Mechanisms supporting or implementing the obscuring of feedback of \nauthentication information during authentication]",
    discussion:
      "The feedback from systems does not provide any information that would allow unauthorized \nindividuals to compromise authentication mechanisms. For some types of systems or system \ncomponents, for example, desktop or notebook computers with relatively large monitors, \nthe threat (often referred to as shoulder surfing) may be significant. For other types of \nsystems or components, for example, mobile devices with small displays, this threat may be \nless significant, and is balanced against the increased likelihood of typographic input errors \ndue to the small keyboards. Therefore, the means for obscuring the authenticator feedback \nis selected accordingly. Obscuring authenticator feedback includes displaying asterisks \nwhen users type passwords into input devices or displaying feedback for a very limited time \nbefore fully obscuring it.",
    further_discussion:
      "Authentication information includes passwords. When users enter a password, the system \ndisplays a symbol, such as an asterisk, to obscure feedback preventing others from seeing \nthe actual characters. Feedback is obscured based on a defined policy (e.g., smaller devices \nmay briefly show characters before obscuring).",
    fd_examples: {
      Example:
        "As a system administrator, you configure your systems to display an asterisk when users \nenter their passwords into a computer system [a]. For mobile devices, the password \ncharacters are briefly displayed to the user before being obscured. This prevents people from \nfiguring out passwords by looking over someone’s shoulder.",
    },
    fd_pac: [
      "Is the feedback immediately obscured when the authentication is presented on a larger \ndisplay (e.g., desktop or notebook computers with relatively large monitors) [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.5.11"],
  },
  {
    id: 55,
    level: 2,
    section: "3.6.1",
    section_name: "INCIDENT HANDLING ",
    brief_description:
      "Establish an operational incident-handling capability for organizational systems that \nincludes preparation, detection, analysis, containment, recovery, and user response \nactivities. \n",
    assessment_objectives: {
      a: "an operational incident-handling capability is established;",
      b: "the operational incident-handling capability includes preparation;",
      c: "the operational incident-handling capability includes detection;",
      d: "the operational incident-handling capability includes analysis;",
      e: "the operational incident-handling capability includes containment;",
      f: "the operational incident-handling capability includes recovery; and",
      g: "the operational incident-handling capability includes user response activities.",
    },
    examine:
      "[SELECT FROM: Incident response policy; contingency planning policy; procedures \naddressing incident handling; procedures addressing incident response assistance; incident \nresponse plan; contingency plan; system security plan; procedures addressing incident \nresponse training; incident response training curriculum; incident response training \nmaterials; incident response training records; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with incident handling responsibilities; personnel with \ncontingency planning responsibilities; personnel with incident response training and \noperational responsibilities; personnel with incident response assistance and support \nresponsibilities; personnel with access to incident response support and assistance \ncapability; personnel with information security responsibilities]",
    test: "[SELECT FROM: Incident-handling capability for the organization; organizational processes \nfor incident response assistance; mechanisms supporting or implementing incident \nresponse assistance]",
    discussion:
      "Organizations recognize that incident handling capability is dependent on the capabilities of \norganizational systems and the mission/business processes being supported by those \nsystems. Organizations consider incident handling as part of the definition, design, and \ndevelopment of mission/business processes and systems. Incident-related information can \nbe obtained from a variety of sources including audit monitoring, network monitoring, \nphysical access monitoring, user and administrator reports, and reported supply chain \nevents. Effective incident handling capability includes coordination among many \norganizational entities including mission/business owners, system owners, authorizing \nofficials, human resources offices, physical and personnel security offices, legal departments, \noperations personnel, procurement offices, and the risk executive. \nAs part of user response activities, incident response training is provided by organizations \nand is linked directly to the assigned roles and responsibilities of organizational personnel \nto ensure that the appropriate content and level of detail is included in such training. For \nexample, regular users may only need to know who to call or how to recognize an incident \non the system; system administrators may require additional training on how to handle or \nremediate incidents; and incident responders may receive more specific training on \nforensics, reporting, system recovery, and restoration. Incident response training includes \nuser training in the identification/reporting of suspicious activities from external and \ninternal sources. User response activities also includes incident response assistance which \nmay consist of help desk support, assistance groups, and access to forensics services or \nconsumer redress services, when required. \nNIST SP 800-61 provides guidance on incident handling. SP 800-86 and SP 800-101 provide \nguidance on integrating forensic techniques into incident response. SP 800-161 provides \nguidance on supply chain risk management.",
    further_discussion:
      "Incident handling capabilities prepare your organization to respond to incidents and may:  \n identify people inside and outside your organization you may need to contact during an \nincident; \n establish a way to report incidents, such as an email address or a phone number; \n establish a system for tracking incidents; and \n determine a place and a way to store evidence of an incident. \nSoftware and hardware may be required to analyze incidents when they occur. Incident \nprevention activities are also part of an incident-handling capability. The incident-handling \nteam provides input for such things as risk assessments and training. \nContractors detect incidents using different indicators. Indicators may include: \n alerts from sensors or antivirus software; \n a filename that looks unusual; and \n log entries that raise concern. \nAfter detecting an incident, an incident response team performs analysis. This requires some \nknowledge of normal network operations. The incident should be documented including all \nthe log entries associated with the incident. \nContainment of the incident is a critical step to stop the damage the incident is causing to \nyour network. Containment activities should be based on previously defined organizational \npriorities and assessment of risk.  \nRecovery activities restore systems to pre-incident functionality and address its underlying \ncauses. Organizations should use recovery activities as a means of improving their overall \nresilience to future attacks.",
    fd_examples: {
      Example:
        "Your manager asks you to set up your company’s incident-response capability [a]. First, you \ncreate an email address to collect information on possible incidents. Next, you draft a contact \nlist of all the people who need to know when an incident occurs. You document a procedure \nfor how to submit incidents that includes roles and responsibilities when a potential incident \nis detected or reported. The procedure also explains how to track incidents, from initial \ncreation to closure [b].",
    },
    fd_pac: [
      "Is there an incident response policy which specifically outlines requirements for handling \nof incidents involving CUI [a]?45",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.6.1"],
  },
  {
    id: 56,
    level: 2,
    section: "3.6.2",
    section_name: "INCIDENT REPORTING ",
    brief_description:
      "Track, document, and report incidents to designated officials and/or authorities both \ninternal and external to the organization. \n",
    assessment_objectives: {
      a: "incidents are tracked;",
      b: "incidents are documented;",
      c: "authorities to whom incidents are to be reported are identified;",
      d: "organizational officials to whom incidents are to be reported are identified;",
      e: "identified authorities are notified of incidents; and",
      f: "identified organizational officials are notified of incidents.",
    },
    examine:
      "[SELECT FROM: Incident response policy; procedures addressing incident monitoring; \nincident response records and documentation; procedures addressing incident reporting; \nincident reporting records and documentation; incident response plan; system security plan; \nother relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with incident monitoring responsibilities; personnel with \nincident reporting responsibilities; personnel who have or should have reported incidents; \npersonnel (authorities) to whom incident information is to be reported; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Incident monitoring capability for the organization; mechanisms supporting \nor implementing tracking and documenting of system security incidents; organizational \nprocesses for incident reporting; mechanisms supporting or implementing incident \nreporting]",
    discussion:
      "Tracking and documenting system security incidents includes maintaining records about \neach incident, the status of the incident, and other pertinent information necessary for \nforensics, evaluating incident details, trends, and handling. Incident information can be \nobtained from a variety of sources including incident reports, incident response teams, audit \nmonitoring, network monitoring, physical access monitoring, and user/administrator \nreports. Reporting incidents addresses specific incident reporting requirements within an \norganization and the formal incident reporting requirements for the organization. Suspected \nsecurity incidents may also be reported and include the receipt of suspicious email \ncommunications that can potentially contain malicious code. The types of security incidents \nreported, the content and timeliness of the reports, and the designated reporting authorities \nreflect applicable laws, Executive Orders, directives, regulations, and policies. \nNIST SP 800-61 provides guidance on incident handling.",
    further_discussion:
      "Incident handling is the actions the organization takes to prevent or contain the impact of an \nincident to the organization while it is occurring or shortly after it has occurred. The majority \nof the process consists of incident identification, containment, eradication, and recovery. \nDuring this process, it is essential to track the work processes required in order to effectively \nrespond. Designate a central hub to serve as the point to coordinate, communicate, and track \nactivities. The hub should receive and document information from system administrators, \nincident handlers, and others involved throughout the process. As the incident process \nmoves toward eradication, executives, affected business units, and any required external \nstakeholders should be kept aware of the incident in order to make decisions affecting the \nbusiness. Report to designated authorities, taking into account applicable laws, directives, \nregulations, and other guidance. Specify staff responsible for communicating about the \nincident to internal and external stakeholders.",
    fd_examples: {
      Example:
        "You notice unusual activity on a server and determine a potential security incident has \noccurred. You open a tracking ticket with the Security Operations Center (SOC), which \nassigns an incident handler to work the ticket [a]. The handler investigates and documents \ninitial findings, which lead to a determination that unauthorized access occurred on the \nserver [b]. The SOC establishes an incident management team consisting of security, \ndatabase, network, and system administrators. The team meets daily to update progress and \nplan courses of action to contain the incident [a]. At the end of the day, the team provides a \nstatus report to IT executives [d,f]. Two days later, the team declares the incident contained. \nThe team produces a final report as the database system is rebuilt and placed back into \noperation.",
    },
    fd_pac: [
      "Is there an incident response policy that directs the establishment of requirements for \ntracking and reporting of incidents involving CUI to appropriate officials [a,d]?",
      "Is cybersecurity incident information promptly reported to management [e,f]?46 \n                                                           \n46 NIST Handbook 162 Section 3.6.2",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.6.2"],
  },
  {
    id: 57,
    level: 2,
    section: "3.6.3",
    section_name: "INCIDENT RESPONSE TESTING ",
    brief_description:
      "Test the organizational incident response capability. \n",
    assessment_objectives: { a: "the incident response capability is tested." },
    examine:
      "[SELECT FROM: Incident response policy; contingency planning policy; procedures \naddressing incident response testing; procedures addressing contingency plan testing; \nincident response testing material; incident response test results; incident response test \nplan; incident response plan; contingency plan; system security plan; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with incident response testing responsibilities; personnel with \ninformation security responsibilities; personnel with responsibilities for testing plans \nrelated to incident response]",
    test: "[SELECT FROM: Mechanisms and processes for incident response]",
    discussion:
      "Organizations test incident response capabilities to determine the effectiveness of the \ncapabilities and to identify potential weaknesses or deficiencies. Incident response testing \nincludes the use of checklists, walk-through or tabletop exercises, simulations (both parallel \nand full interrupt), and comprehensive exercises. Incident response testing can also include \na determination of the effects on organizational operations (e.g., reduction in mission \ncapabilities), organizational assets, and individuals due to incident response. \nNIST SP 800-84 provides guidance on testing programs for information technology \ncapabilities.",
    further_discussion:
      "Testing incident response capability validates existing plans and highlights potential \ndeficiencies. The test should address questions such as what happens during an incident; \nwho is responsible for incident management; what tasks are assigned within the IT \norganization; what support is needed from legal, public affairs, or other business \ncomponents; how resources are added if needed during the incident; and how law \nenforcement is involved. Any negative impacts to the normal day-to-day operations when \nresponding to an incident should also be identified and documented.",
    fd_examples: {
      Example:
        "You decide to conduct an incident response table top exercise that simulates an attacker \ngaining access to the network through a compromised server. You include relevant IT staff \nsuch as security, database, network, and system administrators as participants. You also \nrequest representatives from legal, human resources, and communications. You provide a \nscenario to the group and have prepared key questions aligned with the response plans to \nguide the exercise. During the exercise, you focus on how the team executes the incident \nresponse plan. Afterward, you conduct a debrief with everyone that was involved to provide \nfeedback and develop improvements to the incident response plan [a].",
    },
    fd_pac: [
      "Does the incident response policy outline requirements for regular incident response \nplan testing and reviews of incident response capabilities [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.6.3"],
  },
  {
    id: 58,
    level: 2,
    section: "3.7.1",
    section_name: "PERFORM MAINTENANCE ",
    brief_description: "Perform maintenance on organizational systems. \n",
    assessment_objectives: { a: "system maintenance is performed." },
    examine:
      "[SELECT FROM: System maintenance policy; procedures addressing controlled system \nmaintenance; maintenance records; manufacturer or vendor maintenance specifications; \nequipment sanitization records; media sanitization records; system security plan; other \nrelevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with system maintenance responsibilities; personnel with \ninformation security responsibilities; personnel responsible for media sanitization; system \nor network administrators]",
    test: "[SELECT FROM: Organizational processes for scheduling, performing, documenting, \nreviewing, approving, and monitoring maintenance and repairs for systems; organizational \nprocesses for sanitizing system components; mechanisms supporting or implementing \ncontrolled maintenance; mechanisms implementing sanitization of system components]",
    discussion:
      "This requirement addresses the information security aspects of the system maintenance \nprogram and applies to all types of maintenance to any system component (including \nhardware, firmware, applications) conducted by any local or nonlocal entity. System \nmaintenance also includes those components not directly associated with information \nprocessing and data or information retention such as scanners, copiers, and printers.",
    further_discussion:
      "One common form of computer security maintenance is regular patching of discovered \nvulnerabilities in software and operating systems, though there are others that require \nattention.  \nSystem maintenance includes: \n corrective maintenance (e.g., repairing problems with the technology); \n preventative maintenance (e.g., updates to prevent potential problems); \n adaptive maintenance (e.g., changes to the operative environment); and \n perfective maintenance (e.g., improve operations).",
    fd_examples: {
      Example:
        "You are responsible for maintenance activities on your company’s machines. This includes \nregular planned maintenance, unscheduled maintenance, reconfigurations when required, \nand damage repairs [a]. You know that failing to conduct maintenance activities can impact \nsystem security and availability, so you ensure that maintenance is regularly performed. You \ntrack all maintenance performed to assist with troubleshooting later if needed.",
    },
    fd_pac: [
      "Are systems, devices, and supporting systems maintained per manufacturer \nrecommendations or company defined schedules [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.7.1"],
  },
  {
    id: 59,
    level: 2,
    section: "3.7.2",
    section_name: "SYSTEM MAINTENANCE CONTROL ",
    brief_description:
      "Provide controls on the tools, techniques, mechanisms, and personnel used to conduct \nsystem maintenance. \n",
    assessment_objectives: {
      a: "tools used to conduct system maintenance are controlled;",
      b: "techniques used to conduct system maintenance are controlled;",
      c: "mechanisms used to conduct system maintenance are controlled; and",
      d: "personnel used to conduct system maintenance are controlled.",
    },
    examine:
      "[SELECT FROM: System maintenance policy; procedures addressing system maintenance \ntools and media; maintenance records; system maintenance tools and associated \ndocumentation; maintenance tool inspection records; system security plan; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with system maintenance responsibilities; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Organizational processes for approving, controlling, and monitoring \nmaintenance tools; mechanisms supporting or implementing approval, control, and \nmonitoring of maintenance tools; organizational processes for inspecting maintenance tools; \nmechanisms supporting or implementing inspection of maintenance tools; organizational \nprocess for inspecting media for malicious code; mechanisms supporting or implementing \ninspection of media used for maintenance]",
    discussion:
      "This requirement addresses security-related issues with maintenance tools that are not \nwithin the organizational system boundaries that process, store, or transmit CUI, but are \nused specifically for diagnostic and repair actions on those systems. Organizations have \nflexibility in determining the controls in place for maintenance tools, but can include \napproving, controlling, and monitoring the use of such tools. Maintenance tools are potential \nvehicles for transporting malicious code, either intentionally or unintentionally, into a \nfacility and into organizational systems. Maintenance tools can include hardware, software, \nand firmware items, for example, hardware and software diagnostic test equipment and \nhardware and software packet sniffers.",
    further_discussion:
      "Tools used to perform maintenance must remain secure so they do not introduce viruses or \nother malware into your system. Controlling your maintenance techniques prevents \nintentional or unintentional harm to your network and systems. Additionally, the personnel \nresponsible for maintenance activities should be supervised considering their elevated \nprivilege on company assets.",
    fd_examples: {
      Example:
        "You are responsible for maintenance activities on your company’s machines. To avoid \nintroducing additional vulnerability into the systems you are maintaining, you make sure \nthat all maintenance tools are approved and their usage is monitored and controlled [a,b]. \nYou ensure the tools are kept current and up-to-date [a]. You and your backup are the only \npeople authorized to use these tools and perform system maintenance [d].",
    },
    fd_pac: [
      "Are physical or logical access controls used to limit access to maintenance tools to \nauthorized personnel [a]?",
      "Are physical or logical access controls used to limit access to system documentation and \norganizational maintenance process documentation to authorized personnel [b]?",
      "Are physical or logical access controls used to limit access to automated mechanisms \n(e.g., automated scripts, scheduled jobs) to authorized personnel [c]?",
      "Are physical or logical access controls used to limit access to the system entry points that \nenable maintenance (e.g., administrative portals, local and remote console access, and \nphysical equipment panels) to authorized personnel [d]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.7.2"],
  },
  {
    id: 60,
    level: 2,
    section: "3.7.3",
    section_name: "EQUIPMENT SANITIZATION ",
    brief_description:
      "Ensure equipment removed for off-site maintenance is sanitized of any CUI. \n",
    assessment_objectives: {
      a: "equipment to be removed from organizational spaces for off-site maintenance is \nsanitized of any CUI.",
    },
    examine:
      "[SELECT FROM: System maintenance policy; procedures addressing controlled system \nmaintenance; maintenance records; manufacturer or vendor maintenance specifications; \nequipment sanitization records; media sanitization records; system security plan; other \nrelevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with system maintenance responsibilities; personnel with \ninformation security responsibilities; personnel responsible for media sanitization; system \nor network administrators]",
    test: "[SELECT FROM: Organizational processes for scheduling, performing, documenting, \nreviewing, approving, and monitoring maintenance and repairs for systems; organizational \nprocesses for sanitizing system components; mechanisms supporting or implementing \ncontrolled maintenance; mechanisms implementing sanitization of system components]",
    discussion:
      "This requirement addresses the information security aspects of system maintenance that are \nperformed off-site and applies to all types of maintenance to any system component \n(including applications) conducted by a local or nonlocal entity (e.g., in-contract, warranty, \nin-house, software maintenance agreement). \nNIST SP 800-88 provides guidance on media sanitization.",
    further_discussion:
      "Sanitization is a process that makes access to data infeasible on media such as a hard drive. \nThe process may overwrite the entire media with a fixed pattern such as binary zeros. In \naddition to clearing the data an organization could purge (e.g., degaussing, secure erasing, or \ndisassembling) the data, or even destroy the media (e.g., incinerating, shredding, or \npulverizing). Performing one of these activities ensures that the data is extremely hard to \nrecover, thus ensuring its confidentiality. \nFor additional guidance on which specific sanitization actions should be taken on any specific \ntype of media, review the description of the Purge actions given in NIST SP 800-88 \nRevision 1 – Guidelines for Media Sanitization.",
    fd_examples: {
      Example:
        "You manage your organization’s IT equipment. A recent DoD project has been using a storage \narray to house CUI. Recently, the array has experienced disk issues. After troubleshooting \nwith the vendor, they recommend several drives be replaced in the array. Knowing the drives \nmay contain CUI, you reference NIST 800-88 Rev. 1 and determine a strategy you can \nimplement on the defective equipment – processing the drives with a degaussing unit [a]. \nOnce all the drives have been wiped, you document the action and ship the faulty drives to \nthe vendor.",
    },
    fd_pac: [
      "Is there a process for sanitizing (e.g., erasing, wiping, degaussing) equipment that was \nused to store, process, or transmit CUI before it is removed from the facility for off-site \nmaintenance (e.g., manufacturer or contracted maintenance support) [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.7.3"],
  },
  {
    id: 61,
    level: 2,
    section: "3.7.4",
    section_name: "MEDIA INSPECTION ",
    brief_description:
      "Check media containing diagnostic and test programs for malicious code before the media \nare used in organizational systems. \n",
    assessment_objectives: {
      a: "media containing diagnostic and test programs are checked for malicious code before \nbeing used in organizational systems that process, store, or transmit CUI.",
    },
    examine:
      "[SELECT FROM: System maintenance policy; procedures addressing system maintenance \ntools; system maintenance tools and associated documentation; maintenance records; \nsystem security plan; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with system maintenance responsibilities; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Organizational process for inspecting media for malicious code; \nmechanisms supporting or implementing inspection of media used for maintenance]",
    discussion:
      "If, upon inspection of media containing maintenance diagnostic and test programs, \norganizations determine that the media contain malicious code, the incident is handled \nconsistent with incident handling policies and procedures.",
    further_discussion:
      "As part of troubleshooting, a vendor may provide a diagnostic application to install on a \nsystem. As this is executable code, there is a chance that the file is corrupt or infected with \nmalicious code. Implement procedures to scan any files prior to installation. The same level \nof scrutiny must be made as with any file a staff member may download. \nThis practice, MA.L2-3.7.4, extends both SI.L1-3.14.2 and SI.L1-3.14.4. SI.L1-3.14.2 and SI.L1-\n3.14.4 require the implementation and updating of mechanisms to protect systems from \nmalicious code, and MA.L2-3.7.4 extends this requirement to diagnostic and testing tools.",
    fd_examples: {
      Example:
        "You have recently been experiencing performance issues on one of your servers. After \ntroubleshooting for much of the morning, the vendor has asked to install a utility that will \ncollect more data from the server. The file is stored on the vendor’s FTP server. The support \ntechnician gives you the FTP site so you can anonymously download the utility file. You also \nask him for a hash of the utility file. As you download the file to your local computer, you \nrealize it is compressed. You unzip the file and perform a manual antivirus scan, which \nreports no issues [a]. To verify the utility file has not been altered, you run an application to \nsee that the hash from the vendor matches.",
    },
    fd_pac: [
      "Are media containing diagnostic and test programs (e.g., downloaded or copied utilities \nor tools from manufacturer, third-party, or in-house support teams) checked for \nmalicious code (e.g., using antivirus or antimalware scans) before the media are used on \norganizational systems [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.7.4"],
  },
  {
    id: 62,
    level: 2,
    section: "3.7.5",
    section_name: "NONLOCAL MAINTENANCE ",
    brief_description:
      "Require multifactor authentication to establish nonlocal maintenance sessions via external \nnetwork connections and terminate such connections when nonlocal maintenance is \ncomplete. \n",
    assessment_objectives: {
      a: "multifactor authentication is used to establish nonlocal maintenance sessions via \nexternal network connections; and",
      b: "nonlocal maintenance sessions established via external network connections are \nterminated when nonlocal maintenance is complete.",
    },
    examine:
      "[SELECT FROM: System maintenance policy; procedures addressing nonlocal system \nmaintenance; system security plan; system design documentation; system configuration \nsettings and associated documentation; maintenance records; diagnostic records; other \nrelevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with system maintenance responsibilities; personnel with \ninformation security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Organizational processes for managing nonlocal maintenance; mechanisms \nimplementing, supporting, and managing nonlocal maintenance; mechanisms for strong \nauthentication of nonlocal maintenance diagnostic sessions; mechanisms for terminating \nnonlocal maintenance sessions and network connections]",
    discussion:
      "Nonlocal maintenance and diagnostic activities are those activities conducted by individuals \ncommunicating through an external network. The authentication techniques employed in \nthe establishment of these nonlocal maintenance and diagnostic sessions reflect the network \naccess requirements in IA.L2-3.5.3.",
    further_discussion:
      "Nonlocal maintenance activities must use multifactor authentication. Multifactor \nauthentication requires at least two factors, such as: \n something you know (e.g., password, personal identification number [PIN]); \n something you have (e.g., cryptographic identification device, token); or \n something you are (e.g., biometric fingerprint or facial scan). \nRequiring two or more factors to prove your identity increases the security of the \nconnection. Nonlocal maintenance activities are activities conducted from external network \nconnections such as over the internet. After nonlocal maintenance activities are complete, \nshut down the external network connection. \nThis practice, MA.L2-3.7.5 requires the addition of multifactor authentication for remote \nmaintenance sessions and complements five other practices dealing with remote access \n(AC.L2-3.1.12, AC.L2-3.1.14, AC.L2-3.1.13, AC.L2-3.1.15, and IA.L2-3.5.3):  \n AC.L2-3.1.12 requires the control of remote access sessions.  \n AC.L2-3.1.14 limits remote access to specific access control points.  \n AC.L2-3.1.13 requires the use of cryptographic mechanisms when enabling remote \nsessions.  \n AC.L2-3.1.15 requires authorization for privileged commands executed during a remote \nsession.  \n Finally, IA.L2-3.5.3 requires multifactor authentication for network access to non-\nprivileged accounts.",
    fd_examples: {
      Example:
        "You are responsible for maintaining your company’s firewall. In order to conduct \nmaintenance while working remotely, you connect to the firewall’s management interface \nand log in using administrator credentials. The firewall then sends a verification request to \nthe multifactor authentication app on your smartphone [a]. You need both of these things to \nprove your identity [a]. After you respond to the multifactor challenge, you have access to \nthe maintenance interface. When you finish your activities, you shut down the remote \nconnection by logging out and quitting your web browser [b].",
    },
    fd_pac: [
      "Is multifactor authentication required prior to maintenance of a system when connecting \nremotely from outside the system boundary [a]?",
      "Are personnel required to manually terminate remote maintenance sessions established \nvia external network connections when maintenance is complete, or are connections \nterminated automatically through system session management mechanisms [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.7.5"],
  },
  {
    id: 63,
    level: 2,
    section: "3.7.6",
    section_name: "MAINTENANCE PERSONNEL ",
    brief_description:
      "Supervise the maintenance activities of maintenance personnel without required access \nauthorization. \n",
    assessment_objectives: {
      a: "maintenance personnel without required access authorization are supervised during \nmaintenance activities.",
    },
    examine:
      "[SELECT FROM: System maintenance policy; procedures addressing maintenance personnel; \nservice provider contracts; service-level agreements; list of authorized personnel; \nmaintenance records; access control records; system security plan; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with system maintenance responsibilities; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Organizational processes for authorizing and managing maintenance \npersonnel; mechanisms supporting or implementing authorization of maintenance \npersonnel]",
    discussion:
      "This requirement applies to individuals who are performing hardware or software \nmaintenance on organizational systems, while PE.L1-3.10.1 addresses physical access for \nindividuals whose maintenance duties place them within the physical protection perimeter \nof the systems (e.g., custodial staff, physical plant maintenance personnel). Individuals not \npreviously identified as authorized maintenance personnel, such as information technology \nmanufacturers, vendors, consultants, and systems integrators, may require privileged access \nto organizational systems, for example, when required to conduct maintenance activities \nwith little or no notice. Organizations may choose to issue temporary credentials to these \nindividuals based on organizational risk assessments. Temporary credentials may be for \none-time use or for very limited time periods.",
    further_discussion:
      "Individuals without proper permissions must be supervised while conducting maintenance \non organizational machines. Consider creating temporary accounts with short-term \nexpiration periods rather than regular user accounts. Additionally, limit the permissions and \naccess these accounts have to the most restrictive settings possible.",
    fd_examples: {
      Example:
        "One of your software providers has to come on-site to update the software on your \ncompany’s computers. You give the individual a temporary logon and password that expires \nin 12 hours and is limited to accessing only the computers necessary to complete the work \n[a]. This gives the technician access long enough to perform the update. You monitor the \nindividual’s physical and network activity while the maintenance is taking place [a] and \nrevoke access when the job is done.",
    },
    fd_pac: [
      "Are there processes for escorting and supervising maintenance personnel without \nrequired access authorization (e.g., vendor support personnel, short-term maintenance \ncontractors) during system maintenance [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.7.6"],
  },
  {
    id: 64,
    level: 1,
    section: "3.8.3",
    section_name: "MEDIA DISPOSAL ",
    brief_description:
      "Sanitize or destroy information system media containing Federal Contract Information \nbefore disposal or release for reuse. \n",
    assessment_objectives: {
      a: "system media containing FCI is sanitized or destroyed before disposal; and",
      b: "system media containing FCI is sanitized before it is released for reuse.",
    },
    examine:
      "[SELECT FROM: System media protection policy; procedures addressing media sanitization \nand disposal; applicable standards and policies addressing media sanitization; system \nsecurity plan; media sanitization records; system audit logs and records; system design \ndocumentation; system configuration settings and associated documentation; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with media sanitization responsibilities; personnel with \ninformation security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Organizational processes for media sanitization; mechanisms supporting or \nimplementing media sanitization]",
    discussion:
      "This requirement applies to all system media, digital and non-digital, subject to disposal or \nreuse. Examples include: digital media found in workstations, network components, \nscanners, copiers, printers, notebook computers, and mobile devices; and non-digital media \nsuch as paper and microfilm. The sanitization process removes information from the media \nsuch that the information cannot be retrieved or reconstructed. Sanitization techniques, \nincluding clearing, purging, cryptographic erase, and destruction, prevent the disclosure of \ninformation to unauthorized individuals when such media is released for reuse or disposal. \nOrganizations determine the appropriate sanitization methods, recognizing that destruction \nmay be necessary when other methods cannot be applied to the media requiring sanitization. \nOrganizations use discretion on the employment of sanitization techniques and procedures \nfor media containing information that is in the public domain or publicly releasable or \ndeemed to have no adverse impact on organizations or individuals if released for reuse or \ndisposal. Sanitization of non-digital media includes destruction, removing FCI from \ndocuments, or redacting selected sections or words from a document by obscuring the \nredacted sections or words in a manner equivalent in effectiveness to removing the words \nor sections from the document. NARA policy and guidance control sanitization processes for \nfederal contract information. NIST SP 800-88 provides guidance on media sanitization.",
    further_discussion:
      "“Media” refers to a broad range of items that store information, including paper documents, \ndisks, tapes, digital photography, USB drives, CDs, DVDs, and mobile phones. It is important \nto know what information is on media so that you can handle it properly. If there is FCI, you \nor someone in your company should either: \n shred or destroy the device before disposal so it cannot be read; or  \n clean or purge the information, if you want to reuse the device. \nSee NIST Special Publication 800-88, Revision 1, Guidelines for Media Sanitization, for more \ninformation.",
    fd_examples: {
      Example:
        "As you pack for an office move, you find some old CDs in a file cabinet. You determine that \none has information about an old project your company did for the DoD. You shred the CD \nrather than simply throwing it in the trash [a].",
    },
    fd_pac: [
      "Is all managed data storage erased, encrypted, or destroyed using mechanisms to ensure \nthat no usable data is retrievable [a,b]?47",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.vii",
      "NIST SP 800-171 Rev 2 3.8.3",
    ],
  },
  {
    id: 65,
    level: 2,
    section: "3.8.1",
    section_name: "MEDIA PROTECTION ",
    brief_description:
      "Protect (i.e., physically control and securely store) system media containing CUI, both paper \nand digital. \n",
    assessment_objectives: {
      a: "paper media containing CUI is physically controlled;",
      b: "digital media containing CUI is physically controlled;",
      c: "paper media containing CUI is securely stored; and",
      d: "digital media containing CUI is securely stored.",
    },
    examine:
      "[SELECT FROM: System media protection policy; procedures addressing media storage; \nprocedures addressing media access restrictions; access control policy and procedures; \nphysical and environmental protection policy and procedures; system security plan; media \nstorage facilities; access control records; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with system media protection responsibilities; personnel with \ninformation security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Organizational processes for restricting information media; mechanisms \nsupporting or implementing media access restrictions]",
    discussion:
      "System media includes digital and non-digital media. Digital media includes diskettes, \nmagnetic tapes, external and removable hard disk drives, flash drives, compact disks, and \ndigital video disks. Non-digital media includes paper and microfilm. Protecting digital media \nincludes limiting access to design specifications stored on compact disks or flash drives in \nthe media library to the project leader and any individuals on the development team. \nPhysically controlling system media includes conducting inventories, maintaining \naccountability for stored media, and ensuring procedures are in place to allow individuals to \ncheck out and return media to the media library. Secure storage includes a locked drawer, \ndesk, or cabinet, or a controlled media library. \nAccess to CUI on system media can be limited by physically controlling such media, which \nincludes conducting inventories, ensuring procedures are in place to allow individuals to \ncheck out and return media to the media library, and maintaining accountability for all \nstored media. \nNIST SP 800-111 provides guidance on storage encryption technologies for end user devices.",
    further_discussion:
      "CUI can be contained on two types of physical media: \n hardcopy (e.g., CD drives, USB drives, magnetic tape); and \n digital devices (e.g., CD drives, USB drives, video). \nYou should store physical media containing CUI in a secure location. This location should be \naccessible only to those people with the proper permissions. All who access CUI should \nfollow the process for checking it out and returning it.",
    fd_examples: {
      Example:
        "Your company has CUI for a specific Army contract contained on a USB drive. You store the \ndrive in a locked drawer, and you log it on an inventory [d]. You establish a procedure to \ncheck out the USB drive so you have a history of who is accessing it. These procedures help \nto maintain the confidentiality, integrity, and availability of the data.",
    },
    fd_pac: [
      "Is hardcopy media containing CUI handled only by authorized personnel according to \ndefined procedures [a]?",
      "Is digital media containing CUI handled only by authorized personnel according to \ndefined procedures [b]?",
      "Is paper media containing CUI physically secured (e.g., in a locked drawer or cabinet) [c]?",
      "Is digital media containing CUI securely stored (e.g., in access-controlled repositories) \n[d]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.8.1"],
  },
  {
    id: 66,
    level: 2,
    section: "3.8.2",
    section_name: "MEDIA ACCESS ",
    brief_description:
      "Limit access to CUI on system media to authorized users. \n",
    assessment_objectives: {
      a: "access to CUI on system media is limited to authorized users.",
    },
    examine:
      "[SELECT FROM: System media protection policy; procedures addressing media storage; \nphysical and environmental protection policy and procedures; access control policy and \nprocedures; system security plan; system media; designated controlled areas; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with system media protection and storage responsibilities; \npersonnel with information security responsibilities]",
    test: "[SELECT FROM: Organizational processes for storing media; mechanisms supporting or \nimplementing secure media storage and media protection]",
    discussion:
      "Access can be limited by physically controlling system media and secure storage areas. \nPhysically controlling system media includes conducting inventories, ensuring procedures \nare in place to allow individuals to check out and return system media to the media library, \nand maintaining accountability for all stored media. Secure storage includes a locked drawer, \ndesk, or cabinet, or a controlled media library.",
    further_discussion:
      "Limit physical access to CUI to people permitted to access CUI. Use locked or controlled \nstorage areas and limit access to only those allowed to access CUI. Keep track of who accesses \nphysical CUI in an audit log.",
    fd_examples: {
      Example:
        "Your company has CUI for a specific Army contract contained on a USB drive. In order to \ncontrol the data, you establish specific procedures for handling the drive. You designate the \nproject manager as the owner of the data and require anyone who needs access to the data \nto get permission from the data owner [a]. The data owner maintains a list of users that are \nauthorized to access the information. Before an authorized individual can get access to the \nUSB drive that contains the CUI they have to fill out a log and check out the drive. When they \nare done with the data, they check in the drive and return it to its secure storage location.",
    },
    fd_pac: [
      "Is a list of users who are authorized to access the CUI contained on system media \nmaintained [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.8.2"],
  },
  {
    id: 67,
    level: 2,
    section: "3.8.4",
    section_name: "MEDIA MARKINGS ",
    brief_description:
      "Mark media with necessary CUI markings and distribution limitations. \n",
    assessment_objectives: {
      a: "media containing CUI is marked with applicable CUI markings; and",
      b: "media containing CUI is marked with distribution limitations.",
    },
    examine:
      "[SELECT FROM: System media protection policy; procedures addressing media marking; \nphysical and environmental protection policy and procedures; system security plan; list of \nsystem media marking security attributes; designated controlled areas; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with system media protection and marking responsibilities; \npersonnel with information security responsibilities]",
    test: "[SELECT FROM: Organizational processes for marking information media; mechanisms \nsupporting or implementing media marking]",
    discussion:
      "The term security marking refers to the application or use of human-readable security \nattributes. System media includes digital and non-digital media. Marking of system media \nreflects applicable federal laws, Executive Orders, directives, policies, and regulations.",
    further_discussion:
      "All media, hardcopy and digital, must be properly marked to alert individuals to the presence \nof CUI stored on the media. The National Archives and Records Administration (NARA) has \npublished guidelines for labeling media of different sizes.48  \nMP.L2-3.8.8 requires that media have an identifiable owner, so organizations may find it \ndesirable to include ownership information on the device label as well. \n                                                           \n48 NARA, CUI Notice 2019-01: Controlled Unclassified Information (CUI) Coversheets and Labels",
    fd_examples: {
      Example:
        "You were recently contacted by the project team for a new DoD program. The team said they \nwanted the CUI in use for the program to be properly protected. When speaking with them, \nyou realize that most of the protections will be provided as part of existing enterprise \ncybersecurity capabilities. They also mentioned that the project team will use several USB \ndrives to share specific data. You explain that the team must ensure the USB drives are \nexternally marked to indicate the presence of CUI [a]. The project team labels the outside of \neach USB drive with an appropriate CUI label following NARA guidance [a]. Further, the \nlabels indicate that distribution is limited to those employees supporting the DoD program \n[a].",
    },
    fd_pac: ["Are all media containing CUI identified [a,b]?"],
    key_references: ["NIST SP 800-171 Rev 2 3.8.4"],
  },
  {
    id: 68,
    level: 2,
    section: "3.8.5",
    section_name: "MEDIA ACCOUNTABILITY ",
    brief_description:
      "Control access to media containing CUI and maintain accountability for media during \ntransport outside of controlled areas. \n",
    assessment_objectives: {
      a: "access to media containing CUI is controlled; and",
      b: "accountability for media containing CUI is maintained during transport outside of \ncontrolled areas.",
    },
    examine:
      "[SELECT FROM: System media protection policy; procedures addressing media storage; \nphysical and environmental protection policy and procedures; access control policy and \nprocedures; system security plan; system media; designated controlled areas; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with system media protection and storage responsibilities; \npersonnel with information security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Organizational processes for storing media; mechanisms supporting or \nimplementing media storage and media protection]",
    discussion:
      "Controlled areas are areas or spaces for which organizations provide physical or procedural \ncontrols to meet the requirements established for protecting systems and information. \nControls to maintain accountability for media during transport include locked containers \nand cryptography. Cryptographic mechanisms can provide confidentiality and integrity \nprotections depending upon the mechanisms used. Activities associated with transport \ninclude the actual transport as well as those activities such as releasing media for transport \nand ensuring that media enters the appropriate transport processes. For the actual \ntransport, authorized transport and courier personnel may include individuals external to \nthe organization. Maintaining accountability of media during transport includes restricting \ntransport activities to authorized personnel and tracking and obtaining explicit records of \ntransport activities as the media moves through the transportation system to prevent and \ndetect loss, destruction, or tampering.",
    further_discussion:
      "CUI is protected in both physical and digital formats. Physical control can be accomplished \nusing traditional concepts like restricted access to physical locations or locking papers in a \ndesk or filing cabinet. The digitization of data makes access to CUI much easier. CUI can be \nstored and transported on magnetic disks, tapes, USB drives, CD-ROMs, and so on. This \nmakes digital CUI data very portable. It is important for an organization to apply mechanisms \nto prevent unauthorized access to CUI due to ease of transport.",
    fd_examples: {
      Example:
        "Your team has recently completed configuring a server for a DoD customer. The customer \nhas asked that it be ready to plug in and use. An application installed on the server contains \ndata that is considered CUI. You box the server for shipment using tamper-evident packaging \nand label it with the specific recipient for the shipment [b]. You select a reputable shipping \nservice so you will get a tracking number to monitor the progress. Once the item is shipped, \nyou send the recipients the tracking number so they can monitor and ensure prompt delivery \nat their facility.",
    },
    fd_pac: [
      "Do only approved individuals have access to media containing CUI [a]?",
      "Is access to the media containing CUI recorded in an audit log [b]?",
      "Is all CUI data on media encrypted or physically locked prior to transport outside of \nsecure locations [b]?49",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.8.5"],
  },
  {
    id: 69,
    level: 2,
    section: "3.8.6",
    section_name: "PORTABLE STORAGE ENCRYPTION ",
    brief_description:
      "Implement cryptographic mechanisms to protect the confidentiality of CUI stored on digital \nmedia during transport unless otherwise protected by alternative physical safeguards. \n",
    assessment_objectives: {
      a: "the confidentiality of CUI stored on digital media is protected during transport using \ncryptographic mechanisms or alternative physical safeguards.",
    },
    examine:
      "[SELECT FROM: System media protection policy; procedures addressing media transport; \nsystem design documentation; system security plan; system configuration settings and \nassociated documentation; system media transport records; system audit logs and records; \nother relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with system media transport responsibilities; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Cryptographic mechanisms protecting information on digital media during \ntransportation outside controlled areas]",
    discussion:
      "This requirement applies to portable storage devices (e.g., USB memory sticks, digital video \ndisks, compact disks, external or removable hard disk drives). \nNIST SP 800-111 provides guidance on storage encryption technologies for end user devices.",
    further_discussion:
      "CUI can be stored and transported on a variety of portable media, which increases the chance \nthat the CUI can be lost. When identifying the paths CUI flows through your company, identify \ndevices to include in this practice. \nTo mitigate the risk of losing or exposing CUI, implement an encryption scheme to protect \nthe data. Even if the media are lost, proper encryption renders the data inaccessible. When \nencryption is not an option, apply alternative physical safeguards during transport. \nThis practice, MP.L2-3.8.6, provides additional protections to those provided by MP.L2-3.8.5. \nThis practice is intended to protect against situations where control of media access fails, \nsuch as through the loss of the media.",
    fd_examples: {
      Example:
        "You manage the backups for file servers in your datacenter. You know that in addition to the \ncompany’s sensitive information, CUI is stored on the file servers. As part of a broader plan \nto protect data, you send the backup tapes off site to a vendor. You are aware that your \nbackup software provides the option to encrypt data onto tape. You develop a plan to test \nand enable backup encryption for the data sent off site. This encryption provides additional \nprotections for the data on the backup tapes during transport and offsite storage [a].",
    },
    fd_pac: [
      "Are all CUI data on media encrypted or physically protected prior to transport outside of \ncontrolled areas [a]?",
      "Are cryptographic mechanisms used to protect digital media during transport outside of \ncontrolled areas [a]?",
      "Do cryptographic mechanisms comply with FIPS 140-2 [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.8.6"],
  },
  {
    id: 70,
    level: 2,
    section: "3.8.7",
    section_name: "REMOVEABLE MEDIA ",
    brief_description:
      "Control the use of removable media on system components. \n",
    assessment_objectives: {
      a: "the use of removable media on system components is controlled.",
    },
    examine:
      "[SELECT FROM: System media protection policy; system use policy; procedures addressing \nmedia usage restrictions; system security plan; rules of behavior; system design \ndocumentation; system configuration settings and associated documentation; system audit \nlogs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with system media use responsibilities; personnel with \ninformation security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Organizational processes for media use; mechanisms restricting or \nprohibiting use of system media on systems or system components]",
    discussion:
      "In contrast to requirement MP.L2-3.8.1, which restricts user access to media, this \nrequirement restricts the use of certain types of media on systems, for example, restricting \nor prohibiting the use of flash drives or external hard disk drives. Organizations can employ \ntechnical and nontechnical controls (e.g., policies, procedures, and rules of behavior) to \ncontrol the use of system media. Organizations may control the use of portable storage \ndevices, for example, by using physical cages on workstations to prohibit access to certain \nexternal ports, or disabling or removing the ability to insert, read, or write to such devices. \nOrganizations may also limit the use of portable storage devices to only approved devices \nincluding devices provided by the organization, devices provided by other approved \norganizations, and devices that are not personally owned. Finally, organizations may control \nthe use of portable storage devices based on the type of device, prohibiting the use of \nwriteable, portable devices, and implementing this restriction by disabling or removing the \ncapability to write to such devices. Malicious code protection mechanisms include anti-virus \nsignature definitions and reputation-based technologies. Many technologies and methods \nexist to limit or eliminate the effects of malicious code. Pervasive configuration management \nand comprehensive software integrity controls may be effective in preventing execution of \nunauthorized code. In addition to commercial off-the-shelf software, malicious code may also \nbe present in custom-built software. This could include logic bombs, back doors, and other \ntypes of cyber-attacks that could affect organizational missions/business functions. \nTraditional malicious code protection mechanisms cannot always detect such code. In these \nsituations, organizations rely instead on other safeguards including secure coding practices, \nconfiguration management and control, trusted procurement processes, and monitoring \npractices to help ensure that software does not perform functions other than the functions \nintended.",
    further_discussion:
      "Removable media are any type of media storage that you can remove from your computer \nor machine (e.g., CDs, DVDs, diskettes, and USB drives). Write a specific policy for removable \nmedia. The policy should cover the various types of removable media (e.g., write-once media \nand rewritable media) and should discuss the company’s approach to removable media. \nEnsure the following controls are considered and included in the policy: \n limit the use of removable media to the smallest number needed; and \n scan all removable media for viruses.",
    fd_examples: {
      Example:
        "You are in charge of IT operations. You establish a policy for removable media that includes \nUSB drives [a]. The policy information such as: \n only USB drives issued by the organization may be used; and \n USB drives are to be used for work purposes only [a].  \nYou set up a separate computer to scan these drives before anyone uses them on the \nnetwork. This computer has anti-virus software installed that is kept up to date.",
    },
    fd_pac: [
      "Are removable media allowed [a]?50",
      "Are policies and/or procedures in use to control the use of removable media [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.8.7"],
  },
  {
    id: 71,
    level: 2,
    section: "3.8.8",
    section_name: "SHARED MEDIA ",
    brief_description:
      "Prohibit the use of portable storage devices when such devices have no identifiable owner. \n",
    assessment_objectives: {
      a: "the use of portable storage devices is prohibited when such devices have no identifiable \nowner.",
    },
    examine:
      "[SELECT FROM: System media protection policy; system use policy; procedures addressing \nmedia usage restrictions; system security plan; rules of behavior; system configuration \nsettings and associated documentation; system design documentation; system audit logs and \nrecords; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with system media use responsibilities; personnel with \ninformation security responsibilities; system or network administrators]",
    test: "[SELECT FROM: Organizational processes for media use; mechanisms prohibiting use of \nmedia on systems or system components]",
    discussion:
      "Requiring identifiable owners (e.g., individuals, organizations, or projects) for portable \nstorage devices reduces the overall risk of using such technologies by allowing organizations \nto assign responsibility and accountability for addressing known vulnerabilities in the \ndevices (e.g., insertion of malicious code).",
    further_discussion:
      "A portable storage device is a system component that can be inserted into and removed from \na system and is used to store data or information. It typically plugs into a laptop or desktop \nport (e.g., USB port). These devices can contain malicious files that can lead to a compromise \nof a connected system. Therefore, use should be prohibited if the device cannot be traced to \nan owner who is responsible and accountable for its security. \nThis practice, MP.L2-3.8.8, furthers the protections provided by MP.L2-3.8.7 by prohibiting \nunidentified media use even if that media type is allowable.",
    fd_examples: {
      Example:
        "You are the IT manager. One day, a staff member reports finding a USB drive in the parking \nlot. You investigate and learn that there are no labels on the outside of the drive to indicate \nwho might be responsible for it. You send an email to all employees to remind them that IT \npolicies expressly prohibit plugging unknown devices into company computers. You also \ndirect staff members to turn in to the IT help desk any devices that have no identifiable \nowner [a].",
    },
    fd_pac: ["Do portable storage devices used have identifiable owners [a]?"],
    key_references: ["NIST SP 800-171 Rev 2 3.8.8"],
  },
  {
    id: 72,
    level: 2,
    section: "3.8.9",
    section_name: "PROTECT BACKUPS ",
    brief_description:
      "Protect the confidentiality of backup CUI at storage locations. \n",
    assessment_objectives: {
      a: "the confidentiality of backup CUI is protected at storage locations.",
    },
    examine:
      "[SELECT FROM: Procedures addressing system backup; system configuration settings and \nassociated documentation; security plan; backup storage locations; system backup logs or \nrecords; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with system backup responsibilities; personnel with information \nsecurity responsibilities]",
    test: "[SELECT FROM: Organizational processes for conducting system backups; mechanisms \nsupporting or implementing system backups]",
    discussion:
      "Organizations can employ cryptographic mechanisms or alternative physical controls to \nprotect the confidentiality of backup information at designated storage locations. Backed-up \ninformation containing CUI may include system-level information and user-level \ninformation. System-level information includes system-state information, operating system \nsoftware, application software, and licenses. User-level information includes information \nother than system-level information.",
    further_discussion:
      "You protect CUI to ensure that it remains private (confidentiality) and unchanged (integrity). \nMethods to ensure confidentiality may include: \n encrypting files or media; \n managing who has access to the information; and \n physically securing devices and media that contain CUI. \nStorage locations for information are varied, and may include: \n external hard drives; \n USB drives; \n magnetic media (tape cartridge); \n optical disk (CD, DVD); \n Networked Attached Storage (NAS); \n servers; and \n cloud backup. \nThis practice, MP.L2-3.8.9, requires the confidentiality of backup information at storage \nlocations.",
    fd_examples: {
      Example:
        "You are in charge of protecting CUI for your company. Because the company’s backups \ncontain CUI, you work with IT to protect the confidentiality of backup data. You agree to \nencrypt all CUI data as it is saved to an external hard drive [a].",
    },
    fd_pac: [
      "Are data backups encrypted on media before removal from a secured facility [a]?",
      "Are cryptographic mechanisms FIPS validated [a]?51",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.8.9"],
  },
  {
    id: 73,
    level: 2,
    section: "3.9.1",
    section_name: "SCREEN INDIVIDUALS ",
    brief_description:
      "Screen individuals prior to authorizing access to organizational systems containing CUI. \n",
    assessment_objectives: {
      a: "individuals are screened prior to authorizing access to organizational systems \ncontaining CUI.",
    },
    examine:
      "[SELECT FROM: Personnel security policy; procedures addressing personnel screening; \nrecords of screened personnel; system security plan; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with personnel security responsibilities; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Organizational processes for personnel screening]",
    discussion:
      "Personnel security screening (vetting) activities involve the evaluation/assessment of \nindividual’s conduct, integrity, judgment, loyalty, reliability, and stability (i.e., the \ntrustworthiness of the individual) prior to authorizing access to organizational systems \ncontaining CUI. The screening activities reflect applicable federal laws, Executive Orders, \ndirectives, policies, regulations, and specific criteria established for the level of access \nrequired for assigned positions.",
    further_discussion:
      "Ensure all employees who need access to CUI undergo organization-defined screening before \nbeing granted access. Base the types of screening on the requirements for a given position \nand role. \nThe effective screening of personnel provided by this practice, PS.L2-3.9.1, improves upon \nthe effectiveness of authentication performed in IA.L1-3.5.2.",
    fd_examples: {
      Example:
        "You are in charge of security at your organization. You complete standard criminal \nbackground and credit checks of all individuals you hire before they can access CUI [a]. Your \nscreening program follows appropriate laws, policies, regulations, and criteria for the level \nof access required for each position.",
    },
    fd_pac: [
      "Are appropriate background checks completed prior granting access to organizational \nsystems containing CUI [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.9.1"],
  },
  {
    id: 74,
    level: 2,
    section: "3.9.2",
    section_name: "PERSONNEL ACTIONS ",
    brief_description:
      "Ensure that organizational systems containing CUI are protected during and after personnel \nactions such as terminations and transfers. \n",
    assessment_objectives: {
      a: "a policy and/or process for terminating system access and any credentials coincident \nwith personnel actions is established;",
      b: "system access and credentials are terminated consistent with personnel actions such as \ntermination or transfer; and",
      c: "the system is protected during and after personnel transfer actions.",
    },
    examine:
      "[SELECT FROM: Personnel security policy; procedures addressing personnel transfer and \ntermination; records of personnel transfer and termination actions; list of system accounts; \nrecords of terminated or revoked authenticators and credentials; records of exit interviews; \nother relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with personnel security responsibilities; personnel with account \nmanagement responsibilities; system or network administrators; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Organizational processes for personnel transfer and termination; \nmechanisms supporting or implementing personnel transfer and termination notifications; \nmechanisms for disabling system access and revoking authenticators]",
    discussion:
      "Protecting CUI during and after personnel actions may include returning system-related \nproperty and conducting exit interviews. System-related property includes hardware \nauthentication tokens, identification cards, system administration technical manuals, keys, \nand building passes. Exit interviews ensure that individuals who have been terminated \nunderstand the security constraints imposed by being former employees and that proper \naccountability is achieved for system-related property. Security topics of interest at exit \ninterviews can include reminding terminated individuals of nondisclosure agreements and \npotential limitations on future employment. Exit interviews may not be possible for some \nterminated individuals, for example, in cases related to job abandonment, illnesses, and non- \navailability of supervisors. For termination actions, timely execution is essential for \nindividuals terminated for cause. In certain situations, organizations consider disabling the \nsystem accounts of individuals that are being terminated prior to the individuals being \nnotified. \nThis requirement applies to reassignments or transfers of individuals when the personnel \naction is permanent or of such extended durations as to require protection. Organizations \ndefine the CUI protections appropriate for the types of reassignments or transfers, whether \npermanent or extended. Protections that may be required for transfers or reassignments to \nother positions within organizations include returning old and issuing new keys, \nidentification cards, and building passes; changing system access authorizations (i.e., \nprivileges); closing system accounts and establishing new accounts; and providing for access \nto official records to which individuals had access at previous work locations and in previous \nsystem accounts.",
    further_discussion:
      "Employee access to CUI is removed when they change jobs or leave the company. When \nemployment or program access is terminated for any reason, the following actions may occur \nwithin the defined time frame: \n all company IT equipment (e.g., laptops, cell phones, storage devices) is returned; \n all identification, access cards, and keys are returned; and \n an exit interview is conducted to remind the employee of their obligations to not discuss \nCUI, even after employment.  \nAdditionally, perform the following: \n remove access to all accounts granting access to CUI or modify access to CUI as \nappropriate for a new work role; \n disable or close employee accounts for departing employees; and \n limit access to physical spaces with CUI for departing employees or those who transition \nto a work role that does not require access to CUI. \nThis practice, PS.L2-3.9.2, leverages the identification of system users required by IA.L1-\n3.5.1 in order to ensure that all accesses are identified and removed.",
    fd_examples: {
      "Example 1":
        "You are in charge of IT operations. Per organizational policies, when workers leave the \ncompany, you remove them from any physical CUI access lists. If you are not their supervisor, \nyou contact their supervisor or human resources immediately and ask them to: \n turn in the former employees’ computers for proper handling; \n inform help desk or system administrators to have the former employees’ system access \nrevoked; \n retrieve the former employees’ identification and access cards; and \n have the former employees attend an exit interview where you or human resources \nremind them of their obligations to not discuss CUI [b].",
      "Example 2":
        "An employee transfers from one working group in your company to another. Human \nresources team notifies IT of the transfer date, and the employee’s new manager follows \nprocedure by submitting a ticket to the IT help desk to provide information on the access \nrights the employee will require in their new role. IT implements the rights for the new \nposition and revokes the access for the prior position on the official date of the transfer [c].",
    },
    fd_pac: [
      "Is information system access disabled upon employee termination or transfer [c]?",
      "Are authenticators/ credentials associated with the employee revoked upon termination \nor transfer within a certain time frame [b,c]?",
      "Is all company information system-related property retrieved from the terminated or \ntransferred employee within a certain timeframe [a,c]?",
      "Is access to company information and information systems formerly controlled by the \nterminated or transferred employee retained for a certain timeframe [a,c]?",
      "Is the information security office and data owner of the change in authorization notified \nwithin a certain timeframe [a]?52",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.9.2"],
  },
  {
    id: 75,
    level: 1,
    section: "3.10.1",
    section_name: "LIMIT PHYSICAL ACCESS ",
    brief_description:
      "Limit physical access to organizational information systems, equipment, and the respective \noperating environments to authorized individuals. \n",
    assessment_objectives: {
      a: "authorized individuals allowed physical access are identified;",
      b: "physical access to organizational systems is limited to authorized individuals;",
      c: "physical access to equipment is limited to authorized individuals; and",
      d: "physical access to operating environments is limited to authorized individuals.",
    },
    examine:
      "[SELECT FROM: Physical and environmental protection policy; procedures addressing \nphysical access authorizations; system security plan; authorized personnel access list; \nauthorization credentials; physical access list reviews; physical access termination records \nand associated documentation; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with physical access authorization responsibilities; personnel \nwith physical access to system facility; personnel with information security responsibilities]",
    test: "[SELECT FROM: Organizational processes for physical access authorizations; mechanisms \nsupporting or implementing physical access authorizations]",
    discussion:
      "This requirement applies to employees, individuals with permanent physical access \nauthorization credentials, and visitors. Authorized individuals have credentials that include \nbadges, identification cards, and smart cards. Organizations determine the strength of \nauthorization credentials needed consistent with applicable laws, directives, policies, \nregulations, standards, procedures, and guidelines. This requirement applies only to areas \nwithin facilities that have not been designated as publicly accessible. \nLimiting physical access to equipment may include placing equipment in locked rooms or \nother secured areas and allowing access to authorized individuals only, and placing \nequipment in locations that can be monitored by organizational personnel. Computing \ndevices, external disk drives, networking devices, monitors, printers, copiers, scanners, \nfacsimile machines, and audio devices are examples of equipment.",
    further_discussion:
      "This addresses the company’s physical space (e.g., office, testing environments, equipment \nrooms), technical assets, and non-technical assets that need to be protected from \nunauthorized physical access. Specific environments are limited to authorized employees, \nand access is controlled with badges, electronic locks, physical key locks, etc. \nOutput devices, such as printers, are placed in areas where their use does not expose data to \nunauthorized individuals. Lists of personnel with authorized access are developed and \nmaintained, and personnel are issued appropriate authorization credentials.",
    fd_examples: {
      Example:
        "You manage a DoD project that requires special equipment used only by project team \nmembers [b,c]. You work with the facilities manager to put locks on the doors to the areas \nwhere the equipment is stored and used [b,c,d]. Project team members are the only \nindividuals issued with keys to the space. This restricts access to only those employees who \nwork on the DoD project and require access to that equipment.",
    },
    fd_pac: [
      "Are lists of personnel with authorized access developed and maintained, and are \nappropriate authorization credentials issued [a]?53",
      "Has the facility/building manager designated building areas as “sensitive” and designed \nphysical security protections (e.g., guards, locks, cameras, card readers) to limit physical \naccess to the area to only authorized employees [b,c,d]?54",
      "Are output devices such as printers placed in areas where their use does not expose data \nto unauthorized individuals [c]?55",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.viii",
      "NIST SP 800-171 Rev 2 3.10.1",
    ],
  },
  {
    id: 76,
    level: 1,
    section: "3.10.3",
    section_name: "ESCORT VISITORS ",
    brief_description: "Escort visitors and monitor visitor activity. \n",
    assessment_objectives: {
      a: "visitors are escorted; and",
      b: "visitor activity is monitored.",
    },
    examine:
      "[SELECT FROM: Physical and environmental protection policy; procedures addressing \nphysical access control; system security plan; physical access control logs or records; \ninventory records of physical access control devices; system entry and exit points; records \nof key and lock combination changes; storage locations for physical access control devices; \nphysical access control devices; list of security safeguards controlling access to designated \npublicly accessible areas within facility; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with physical access control responsibilities; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Organizational processes for physical access control; mechanisms \nsupporting or implementing physical access control; physical access control devices]",
    discussion:
      "Individuals with permanent physical access authorization credentials are not considered \nvisitors. Audit logs can be used to monitor visitor activity.",
    further_discussion:
      "Do not allow visitors, even those people you know well, to walk around your facility without \nan escort. Make sure that all non-employees wear special visitor badges and/or are escorted \nby an employee at all times while on the property.",
    fd_examples: {
      Example:
        "Coming back from a meeting, you see the friend of a coworker walking down the hallway \nnear your office. You know this person well and trust them, but are not sure why they are in \nthe building. You stop to talk, and the person explains that they are meeting a coworker for \nlunch, but cannot remember where the lunchroom is. You walk the person back to the \nreception area to get a visitor badge and wait until someone can escort them to the lunch \nroom [a]. You report this incident and the company decides to install a badge reader at the \nmain door so visitors cannot enter without an escort [a].",
    },
    fd_pac: [
      "Are personnel required to accompany visitors to areas in a facility with physical access \nto organizational systems [a]?",
      "Are visitors clearly distinguishable from regular personnel [b]?",
      "Is visitor activity monitored (e.g., use of cameras or guards, reviews of secure areas upon \nvisitor departure, review of visitor audit logs) [b]?",
    ],
    key_references: [
      "FAR Clause 52.204-21 Partial b.1.ix",
      "NIST SP 800-171 Rev 2 3.10.3",
    ],
  },
  {
    id: 77,
    level: 1,
    section: "3.10.4",
    section_name: "PHYSICAL ACCESS LOGS ",
    brief_description: "Maintain audit logs of physical access. \n",
    assessment_objectives: {
      a: "audit logs of physical access are maintained.",
    },
    examine:
      "[SELECT FROM: Physical and environmental protection policy; procedures addressing \nphysical access control; system security plan; physical access control logs or records; \ninventory records of physical access control devices; system entry and exit points; records \nof key and lock combination changes; storage locations for physical access control devices; \nphysical access control devices; list of security safeguards controlling access to designated \npublicly accessible areas within facility; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with physical access control responsibilities; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Organizational processes for physical access control; mechanisms \nsupporting or implementing physical access control; physical access control devices]",
    discussion:
      "Organizations have flexibility in the types of audit logs employed. Audit logs can be \nprocedural (e.g., written log of individuals accessing the facility), automated (e.g., capturing \nID provided by a PIV card), or some combination thereof. Physical access points can include \nfacility access points, interior access points to systems or system components requiring \nsupplemental access controls, or both. System components (e.g., workstations, notebook \ncomputers) may be in areas designated as publicly accessible with organizations \nsafeguarding access to such devices.",
    further_discussion:
      "Make sure you have a record of who accesses your facility (e.g., office, plant, factory). You can \ndo this in writing by having employees and visitors sign in and sign out or by electronic \nmeans such as badge readers. Whatever means you use, you need to retain the access records \nfor the time period that your company has defined.",
    fd_examples: {
      Example:
        "You and your coworkers like to have friends and family join you for lunch at the office on \nFridays. Your small company has just signed a contract with the DoD, however, and you now \nneed to document who enters and leaves your facility. You work with the reception staff to \nensure that all non-employees sign in at the reception area and sign out when they leave [a]. \nYou retain those paper sign-in sheets in a locked filing cabinet for one year. Employees \nreceive badges or key cards that enable tracking and logging access to company facilities.",
    },
    fd_pac: [
      "Are logs of physical access to sensitive areas (both authorized access and visitor access) \nmaintained per retention requirements [a]?56",
      "Are visitor access records retained for as long as required [a]?57",
    ],
    key_references: [
      "FAR Clause 52.204-21 Partial b.1.ix",
      "NIST SP 800-171 Rev 2 3.10.4",
    ],
  },
  {
    id: 78,
    level: 1,
    section: "3.10.5",
    section_name: "MANAGE PHYSICAL ACCESS ",
    brief_description: "Control and manage physical access devices. \n",
    assessment_objectives: {
      a: "physical access devices are identified;",
      b: "physical access devices are controlled; and",
      c: "physical access devices are managed.",
    },
    examine:
      "[SELECT FROM: Physical and environmental protection policy; procedures addressing \nphysical access control; system security plan; physical access control logs or records; \ninventory records of physical access control devices; system entry and exit points; records \nof key and lock combination changes; storage locations for physical access control devices; \nphysical access control devices; list of security safeguards controlling access to designated \npublicly accessible areas within facility; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with physical access control responsibilities; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Organizational processes for physical access control; mechanisms \nsupporting or implementing physical access control; physical access control devices]",
    discussion:
      "Physical access devices include keys, locks, combinations, and card readers.",
    further_discussion:
      "Identifying and controlling physical access devices (e.g., locks, badges, key cards) is just as \nimportant as monitoring and limiting who is able to physically access certain equipment. \nPhysical access devices are only strong protection if you know who has them and what access \nthey allow. Physical access devices can be managed using manual or automatic processes \nsuch a list of who is assigned what key, or updating the badge access system as personnel \nchange roles.",
    fd_examples: {
      Example:
        "You are a facility manager. A team member retired today and returns their company keys to \nyou. The project on which they were working requires access to areas that contain \nequipment with FCI. You receive the keys, check your electronic records against the serial \nnumbers on the keys to ensure all have been returned, and mark each key returned [c].",
    },
    fd_pac: [
      "Are lists or inventories of physical access devices maintained (e.g., keys, facility badges, \nkey cards) [a]?",
      "Is access to physical access devices limited (e.g., granted to, and accessible only by, \nauthorized individuals) [b]?",
      "Are physical access devices managed (e.g., revoking key card access when necessary, \nchanging locks as needed, maintaining access control devices and systems) [c]?",
    ],
    key_references: [
      "FAR Clause 52.204-21 Partial b.1.ix",
      "NIST SP 800-171 Rev 2 3.10.5",
    ],
  },
  {
    id: 79,
    level: 2,
    section: "3.10.2",
    section_name: "MONITOR FACILITY ",
    brief_description:
      "Protect and monitor the physical facility and support infrastructure for organizational \nsystems. \n",
    assessment_objectives: {
      a: "the physical facility where organizational systems reside is protected;",
      b: "the support infrastructure for organizational systems is protected;",
      c: "the physical facility where organizational systems reside is monitored; and",
      d: "the support infrastructure for organizational systems is monitored.",
    },
    examine:
      "[SELECT FROM: Physical and environmental protection policy; procedures addressing \nphysical access monitoring; system security plan; physical access logs or records; physical \naccess monitoring records; physical access log reviews; other relevant documents or \nrecords]",
    interview:
      "[SELECT FROM: Personnel with physical access monitoring responsibilities; personnel with \nincident response responsibilities; personnel with information security responsibilities]",
    test: "[SELECT FROM: Organizational processes for monitoring physical access; mechanisms \nsupporting or implementing physical access monitoring; mechanisms supporting or \nimplementing the review of physical access logs]",
    discussion:
      "Monitoring of physical access includes publicly accessible areas within organizational \nfacilities. This can be accomplished, for example, by the employment of guards; the use of \nsensor devices; or the use of video surveillance equipment such as cameras. Examples of \nsupport infrastructure include system distribution, transmission, and power lines. Security \ncontrols applied to the support infrastructure prevent accidental damage, disruption, and \nphysical tampering. Such controls may also be necessary to prevent eavesdropping or \nmodification of unencrypted transmissions. Physical access controls to support \ninfrastructure include locked wiring closets; disconnected or locked spare jacks; protection \nof cabling by conduit or cable trays; and wiretapping sensors.",
    further_discussion:
      "The infrastructure inside of a facility, such as power and network cables, is protected so that \nvisitors and unauthorized employees cannot access it. The protection is also monitored by \nsecurity guards, video cameras, sensors, or alarms.",
    fd_examples: {
      Example:
        "You are responsible for protecting your IT facilities. You install video cameras at each \nentrance and exit, connect them to a video recorder, and show the camera feeds on a display \nat the reception desk [c,d]. You also make sure there are secure locks on all entrances, exits, \nand windows to the facilities [a,b].",
    },
    fd_pac: [
      "Is physical access monitored to detect and respond to physical security incidents [c, d]?58",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.10.2"],
  },
  {
    id: 80,
    level: 2,
    section: "3.10.6",
    section_name: "ALTERNATIVE WORK SITES ",
    brief_description:
      "Enforce safeguarding measures for CUI at alternate work sites. \n",
    assessment_objectives: {
      a: "safeguarding measures for CUI are defined for alternate work sites; and",
      b: "safeguarding measures for CUI are enforced for alternate work sites.",
    },
    examine:
      "[SELECT FROM: Physical and environmental protection policy; procedures addressing \nalternate work sites for personnel; system security plan; list of safeguards required for \nalternate work sites; assessments of safeguards at alternate work sites; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel approving use of alternate work sites; personnel using alternate \nwork sites; personnel assessing controls at alternate work sites; personnel with information \nsecurity responsibilities]",
    test: "[SELECT FROM: Organizational processes for security at alternate work sites; mechanisms \nsupporting alternate work sites; safeguards employed at alternate work sites; means of \ncommunications between personnel at alternate work sites and security personnel]",
    discussion:
      "Alternate work sites may include government facilities or the private residences of \nemployees. Organizations may define different security requirements for specific alternate \nwork sites or types of sites depending on the work-related activities conducted at those sites. \nNIST SP 800-46 and NIST SP 800-114 provide guidance on enterprise and user security \nwhen teleworking.",
    further_discussion:
      "Many people work from home or travel as part of their job. Define and implement safeguards \nto account for protection of information beyond the enterprise perimeter. Safeguards may \ninclude physical protections, such as locked file drawers, as well as electronic protections \nsuch as encryption, audit logging, and proper access controls.",
    fd_examples: {
      Example:
        "Many of your company’s project managers work remotely as they often travel to sponsor \nlocations or even work from home. Because the projects on which they work require access \nto CUI, you must ensure the same level of protection is afforded as when they work in the \noffice. You ensure that each laptop is deployed with patch management and anti-virus \nsoftware protection [b]. Because data may be stored on the local hard drive, you have \nenabled full-disk encryption on their laptops [b]. When a remote staff member needs access \nto the internal network you require VPN connectivity that also disconnects the laptop from \nthe remote network (i.e., prevents split tunneling) [b]. The VPN requires multifactor \nauthentication to verify remote users are who they claim to be [b].",
    },
    fd_pac: [
      "Do all alternate sites where CUI data is stored or processed meet the same physical \nsecurity requirements as the main site [b]?59",
      "Does the alternate processing site provide information security measures equivalent to \nthose of the primary site [b]?60",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.10.6"],
  },
  {
    id: 81,
    level: 2,
    section: "3.11.1",
    section_name: "RI",
    brief_description:
      "sk Assessments \nRisk Assessment (RA) \n\nRA.L2-3.11.1 – RISK ASSESSMENTS \nPeriodically assess the risk to organizational operations (including mission, functions, image, \nor reputation), organizational assets, and individuals, resulting from the operation of \norganizational systems and the associated processing, storage, or transmission of CUI. \n",
    assessment_objectives: {
      a: "the frequency to assess risk to organizational operations, organizational assets, and \nindividuals is defined; and",
      b: "risk to organizational operations, organizational assets, and individuals resulting from \nthe operation of an organizational system that processes, stores, or transmits CUI is \nassessed with the defined frequency.",
    },
    examine:
      "[SELECT FROM: Risk assessment policy; security planning policy and procedures; \nprocedures addressing organizational risk assessments; system security plan; risk \nassessment; risk assessment results; risk assessment reviews; risk assessment updates; \nother relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with risk assessment responsibilities; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Organizational processes for risk assessment; mechanisms supporting or \nfor conducting, documenting, reviewing, disseminating, and updating the risk assessment]",
    discussion:
      "Clearly defined system boundaries are a prerequisite for effective risk assessments. Such risk \nassessments consider threats, vulnerabilities, likelihood, and impact to organizational \noperations, organizational assets, and individuals based on the operation and use of \norganizational systems. Risk assessments also consider risk from external parties (e.g., \nservice providers, contractor operating systems on behalf of the organization, individuals \n \n \nRA.L2-3.11.1 – RIsk Assessments \naccessing organizational systems, outsourcing entities). Risk assessments, either formal or \ninformal, can be conducted at the organization level, the mission or business process level, \nor the system level, and at any phase in the system development life cycle. \nNIST SP 800-30 provides guidance on conducting risk assessments.",
    further_discussion:
      "Risk arises from anything that can reduce an organization’s assurance of mission/business \nsuccess; cause harm to image or reputation; or harm individuals, other organizations, or the \nNation. \nOrganizations assess the risk to their operations and assets at regular intervals. Areas where \nweakness or vulnerabilities could lead to risk may include: \n poorly designed and executed business processes; \n inadvertent actions of people, such as disclosure or modification of information; \n intentional actions of people inside and outside the organization; \n failure of systems to perform as intended; \n failures of technology; and \n external events, such as natural disasters, public infrastructure and supply chain failures. \nWhen conducting risk assessments use established criteria and procedures. The results of \nformal risk assessments are documented. It is important to note that risk assessments differ \nfrom vulnerability assessments (see RA.L2-3.11.2). A vulnerability assessment provides \ninput to a risk assessment along with other information such as results from likelihood \nanalysis and analysis of potential treat sources. \nRisk assessments should be performed at defined regular intervals. Mission risks include \nanything that will keep an organization from meeting its mission. Function risk is anything \nthat will prevent the performance of a function. Image and reputation risks refer to \nintangible risks that have value and could cause damage to potential or future trust \nrelationships.61 \nThis practice, RA.L2-3.11.1, which requires periodically assessing the risk to organization \nsystems, assets, and individuals, is a baseline Risk Assessment practice. RA.L2-3.11.1 enables \nother Risk Assessment practices (e.g., RA.L2-3.11.3, Vulnerability Remediation), as well as \nCA.L2-3.12.2, Plan of Action.",
    fd_examples: {
      Example:
        "You are a system administrator. You and your team members are working on a big \ngovernment contract requiring you to store CUI. As part of your periodic (e.g., annual) risk \nassessment exercise, you evaluate the new risk involved with storing CUI [a,b]. When \nconducting the assessment you consider increased legal exposure, financial requirements of \nsafeguarding CUI, potentially elevated attention from external attackers, and other factors. \n                                                           \n61 NIST SP 800-30, Guide for Conducting Risk Assessments, September 2012. \n \n \nRA.L2-3.11.1 – RIsk Assessments \nAfter determining how storing CUI affects your overall risk profile, you use that as a basis for \na conversation on how that risk should be mitigated.",
    },
    fd_pac: [
      "Have initial and periodic risk assessments been conducted [b]?62",
      "Are methods defined for assessing risk (e.g., reviewing security assessments, incident \nreports, and security advisories, identifying threat sources, threat events, and \nvulnerabilities, and determining likelihood, impact, and overall risk to the confidentiality \nof CUI) [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.11.1"],
  },
  {
    id: 82,
    level: 2,
    section: "3.11.2",
    section_name: "VULNERABILITY SCAN ",
    brief_description:
      "Scan for vulnerabilities in organizational systems and applications periodically and when \nnew vulnerabilities affecting those systems and applications are identified. \n",
    assessment_objectives: {
      a: "the frequency to scan for vulnerabilities in organizational systems and applications is \ndefined;",
      b: "vulnerability scans are performed on organizational systems with the defined \nfrequency;",
      c: "vulnerability scans are performed on applications with the defined frequency;",
      d: "vulnerability scans are performed on organizational systems when new vulnerabilities \nare identified; and",
      e: "vulnerability scans are performed on applications when new vulnerabilities are \nidentified.",
    },
    examine:
      "[SELECT FROM: Risk assessment policy; procedures addressing vulnerability scanning; risk \nassessment; system security plan; security assessment report; vulnerability scanning tools \nand associated configuration documentation; vulnerability scanning results; patch and \nvulnerability management records; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with risk assessment, security assessment and vulnerability \nscanning responsibilities; personnel with vulnerability scan analysis and remediation \nresponsibilities; personnel with information security responsibilities; system or network \nadministrators]",
    test: "[SELECT FROM: Organizational processes for vulnerability scanning, analysis, remediation, \nand information sharing; mechanisms supporting or implementing vulnerability scanning, \nanalysis, remediation, and information sharing]",
    discussion:
      "Organizations determine the required vulnerability scanning for all system components, \nensuring that potential sources of vulnerabilities such as networked printers, scanners, and \ncopiers are not overlooked. The vulnerabilities to be scanned are readily updated as new \nvulnerabilities are discovered, announced, and scanning methods developed. This process \nensures that potential vulnerabilities in the system are identified and addressed as quickly \nas possible. Vulnerability analyses for custom software applications may require additional \napproaches such as static analysis, dynamic analysis, binary analysis, or a hybrid of the three \napproaches. Organizations can employ these analysis approaches in source code reviews and \nin a variety of tools (e.g., static analysis tools, web-based application scanners, binary \nanalyzers). Vulnerability scanning includes: scanning for patch levels; scanning for functions, \nports, protocols, and services that should not be accessible to users or devices; and scanning \nfor improperly configured or incorrectly operating information flow control mechanisms. \nTo facilitate interoperability, organizations consider using products that are Security \nContent Automated Protocol (SCAP)-validated, scanning tools that express vulnerabilities in \nthe Common Vulnerabilities and Exposures (CVE) naming convention, and that employ the \nOpen Vulnerability Assessment Language (OVAL) to determine the presence of system \nvulnerabilities. Sources for vulnerability information include the Common Weakness \nEnumeration (CWE) listing and the National Vulnerability Database (NVD). \nSecurity assessments, such as red team exercises, provide additional sources of potential \nvulnerabilities for which to scan. Organizations also consider using scanning tools that \nexpress vulnerability impact by the Common Vulnerability Scoring System (CVSS). In certain \nsituations, the nature of the vulnerability scanning may be more intrusive or the system \ncomponent that is the subject of the scanning may contain highly sensitive information. \nPrivileged access authorization to selected system components facilitates thorough \nvulnerability scanning and protects the sensitive nature of such scanning. \nNIST SP 800-40 provides guidance on vulnerability management.",
    further_discussion:
      "A vulnerability scanner is an application that identifies vulnerabilities in organizational \nassets. Most scanners can create a prioritized list of vulnerabilities ordered by their level of \nseverity. Scan for vulnerabilities on all devices connected to the network including servers, \ndesktops, laptops, virtual machines, containers, firewalls, switches, and printers. All assets \nthat are within the scope of the CMMC assessment must be scanned, including assets such as \nlaptop computers that may not routinely connect to an organization’s network. \nPerform reviews of your organization’s custom-developed software. Vulnerability analysis \nof a custom-made solution may require a penetration tester to properly test and validate \nfindings. Automated vulnerability scanners may not be as thorough when scanning custom \ndeveloped applications. Source code scanners can help identify weaknesses and \nvulnerabilities within code prior to compilation and use. \nThe vulnerability scanning process is a regular activity, not a single occurrence. \nOrganizations put in place a vulnerability scanner that updates its database each time it \nperforms a scan so it can identify the most current known vulnerabilities. Schedule scans \nwith consideration of the potential for impact to normal operations and use caution when \nscanning critical assets. \nThis practice, RA.L2-3.11.2, which ensures scanning for vulnerabilities in organizational \nsystems and application, is a baseline Risk Assessment practice. RA.L2-3.11.2 ,contributes \nto performing risk assessments as described in RA.L2-3.11.1.",
    fd_examples: {
      Example:
        "You are a system administrator. Your organization has assessed its risk and determined that \nit needs to scan for vulnerabilities in systems and applications once each quarter [a]. You \nconduct some tests and decide that it is important to be able to schedule scans after standard \nbusiness hours. You also realize that you have remote workers and that you will need to be \nsure to scan their remote computers as well [b]. After some final tests, you integrate the scans \ninto normal IT operations, running as scheduled [b,c]. You verify that the scanner application \nreceives the latest updates on vulnerabilities and that those are included in future scans [d,e].",
    },
    fd_pac: [
      "Is the frequency specified for vulnerability scans to be performed in organizational \nsystems and applications (e.g., continuous passive scanning, scheduled active scans) [a]?",
      "Are vulnerability scans performed on a defined frequency or randomly in accordance \nwith company policy [a,b,c]?63",
      "Are systems periodically scanned for common and new vulnerabilities [d,e]?64",
      "Is the list of scanned system vulnerabilities updated on a defined frequency or when new \nvulnerabilities are identified and reported [d,e]?65",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.11.2"],
  },
  {
    id: 83,
    level: 2,
    section: "3.11.3",
    section_name: "VULNERABILITY REMEDIATION ",
    brief_description:
      "Remediate vulnerabilities in accordance with risk assessments. \n",
    assessment_objectives: {
      a: "vulnerabilities are identified; and",
      b: "vulnerabilities are remediated in accordance with risk assessments.",
    },
    examine:
      "[SELECT FROM: Risk assessment policy; procedures addressing vulnerability scanning; risk \nassessment; system security plan; security assessment report; vulnerability scanning tools \nand associated configuration documentation; vulnerability scanning results; patch and \nvulnerability management records; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with risk assessment, security assessment and vulnerability \nscanning responsibilities; personnel with vulnerability scan analysis responsibilities; \npersonnel with vulnerability remediation responsibilities; personnel with information \nsecurity responsibilities; system or network administrators]",
    test: "[SELECT FROM: Organizational processes for vulnerability scanning, analysis, remediation, \nand information sharing; mechanisms supporting or implementing vulnerability scanning, \nanalysis, remediation, and information sharing]",
    discussion:
      "Vulnerabilities discovered, for example, via the scanning conducted in response to RA.L2-\n3.11.2, are remediated with consideration of the related assessment of risk. The \nconsideration of risk influences the prioritization of remediation efforts and the level of \neffort to be expended in the remediation for specific vulnerabilities.",
    further_discussion:
      "Not all vulnerabilities captured in a vulnerability scanner may pose the same level of risk to \nan organization. Prioritize mitigation efforts to close the most critical vulnerabilities first. \nTrack all vulnerability remediation to ensure completion; also track vulnerabilities that you \nhave determined not to remediate. \nThis practice, RA.L2-3.11.3, benefits from CA.L2-3.12.2. RA.L2-3.11.3 allows remediation of \nvulnerabilities to take place based on the developed plans of actions for vulnerabilities from \nCA.L2-3.12.2.",
    fd_examples: {
      Example:
        "You are a system administrator. Each quarter you receive a list of vulnerabilities generated \nby your company’s vulnerability scanner [a]. You prioritize that list and note which \nvulnerabilities should be targeted as soon as possible as well as which vulnerabilities you \ncan safely defer addressing at this time. You document the reasoning behind accepting the \nrisk of the unremediated flaws and note to continue to monitor these vulnerabilities in case \nyou need to revise the decision at a later date [b].",
    },
    fd_pac: [
      "Are the results of risk assessments used to prioritize vulnerabilities for remediation [b]?",
      "For any given vulnerability is action taken for remediation, acceptance, avoidance, or \ntransference of the vulnerability risk [b]?66",
      "Are all high risk vulnerabilities prioritized [b]?67",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.11.3"],
  },
  {
    id: 84,
    level: 2,
    section: "3.12.1",
    section_name: "SECURITY CONTROL ASSESSMENT ",
    brief_description:
      "Periodically assess the security controls in organizational systems to determine if the \ncontrols are effective in their application. \n",
    assessment_objectives: {
      a: "the frequency of security control assessments is defined; and",
      b: "security controls are assessed with the defined frequency to determine if the controls \nare effective in their application.",
    },
    examine:
      "[SELECT FROM: Security assessment and authorization policy; procedures addressing \nsecurity assessment planning; procedures addressing security assessments; security \nassessment plan; system security plan; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with security assessment responsibilities; personnel with \ninformation security responsibilities]",
    test: "[SELECT FROM: Mechanisms supporting security assessment, security assessment plan \ndevelopment, and security assessment reporting]",
    discussion:
      "Organizations assess security controls in organizational systems and the environments in \nwhich those systems operate as part of the system development life cycle. Security controls \nare the safeguards or countermeasures organizations implement to satisfy security \nrequirements. By assessing the implemented security controls, organizations determine if \nthe security safeguards or countermeasures are in place and operating as intended. Security \ncontrol assessments ensure that information security is built into organizational systems; \nidentify weaknesses and deficiencies early in the development process; provide essential \ninformation needed to make risk-based decisions; and ensure compliance to vulnerability \nmitigation procedures. Assessments are conducted on the implemented security controls as \ndocumented in system security plans. \nSecurity assessment reports document assessment results in sufficient detail as deemed \nnecessary by organizations, to determine the accuracy and completeness of the reports and \nwhether the security controls are implemented correctly, operating as intended, and \nproducing the desired outcome with respect to meeting security requirements. Security \nassessment results are provided to the individuals or roles appropriate for the types of \nassessments being conducted. \nOrganizations ensure that security assessment results are current, relevant to the \ndetermination of security control effectiveness, and obtained with the appropriate level of \nassessor independence. Organizations can choose to use other types of assessment activities \nsuch as vulnerability scanning and system monitoring to maintain the security posture of \nsystems during the system life cycle. \nNIST SP 800-53 provides guidance on security and privacy controls for systems and \norganizations. SP 800-53A provides guidance on developing security assessment plans and \nconducting assessments.",
    further_discussion:
      "Avoid a “set it and forget it” mentality when implementing security controls. The security \nlandscape is constantly changing. Reassess existing controls at periodic intervals in order to \nvalidate their effectiveness in your environment. Set the assessment schedule according to \norganizational needs. Consider regulatory obligations and internal policies when assessing \nthe controls. \nOutputs from security control assessments typically include: \n documented assessment results; \n proposed new controls, or updates to existing controls; \n remediation plans; and \n newly identified risks. \nThis practice, CA.L2-3.12.1, which ensures determining security controls are implemented \nproperly, promotes effective security assessments for organizational systems required by \nCA.L2-3.12.3.",
    fd_examples: {
      Example:
        "You are in charge of IT operations. You need to ensure that the security controls \nimplemented within the system are achieving their objectives [b]. Taking the practices \noutlined in your SSP as a guide, you conduct annual written reviews of the security controls \nto ensure they meet your organization’s needs. When you find controls that do not meet \nrequirements, you propose updated or new controls, develop a written implementation plan, \ndocument new risks, and execute the changes.",
    },
    fd_pac: [
      "Are security controls assessed at least annually [a]?",
      "Is the output of the security controls assessment documented [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.12.1"],
  },
  {
    id: 85,
    level: 2,
    section: "3.12.2",
    section_name: "PLAN OF ACTION ",
    brief_description:
      "Develop and implement plans of action designed to correct deficiencies and reduce or \neliminate vulnerabilities in organizational systems. \n",
    assessment_objectives: {
      a: "deficiencies and vulnerabilities to be addressed by the plan of action are identified;",
      b: "a plan of action is developed to correct identified deficiencies and reduce or eliminate \nidentified vulnerabilities; and",
      c: "the plan of action is implemented to correct identified deficiencies and reduce or \neliminate identified vulnerabilities.",
    },
    examine:
      "[SELECT FROM: Security assessment and authorization policy; procedures addressing plan \nof action; system security plan; security assessment plan; security assessment report; \nsecurity assessment evidence; plan of action; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with plan of action development and implementation \nresponsibilities; personnel with information security responsibilities]",
    test: "[SELECT FROM: Mechanisms for developing, implementing, and maintaining plan of action]",
    discussion:
      "The plan of action is a key document in the information security program. Organizations \ndevelop plans of action that describe how any unimplemented security requirements will be \nmet and how any planned mitigations will be implemented. Organizations can document the \nsystem security plan and plan of action as separate or combined documents and in any \nchosen format. \nFederal agencies may consider the submitted system security plans and plans of action as \ncritical inputs to an overall risk management decision to process, store, or transmit CUI on a \nsystem hosted by a nonfederal organization and whether it is advisable to pursue an \nagreement or contract with the nonfederal organization.",
    further_discussion:
      "When you write a plan of action, define the clear goal or objective of the plan. You may \ninclude the following in the action plan: \n ownership of who is accountable for ensuring the plan’s performance; \n specific steps or milestones that are clear and actionable; \n assigned responsibility for each step or milestone; \n milestones to measure plan progress; and \n completion dates. \nThis practice, CA.L2-3.12.2, which ensures developing and implementing plans of action to \ncorrect and reduce vulnerabilities in systems, is driven by risk management practice \nRA.L2-3.11.1, which promotes periodically assessing risk to organizational systems. CA.L2-\n3.12.2 promotes monitoring security controls on an ongoing basis as defined in practice \nCA.L2-3.12.3.",
    fd_examples: {
      Example:
        "As IT director, one of your duties is to develop action plans when you discover that your \ncompany is not meeting security requirements or when a security issue arises [b]. A recent \nvulnerability scan identified several items that need to be addressed so you develop a plan \nto fix them [b]. Your plan identifies the people responsible for fixing the issues, how to do it, \nand when the remediation will be completed [b]. You also define how to verify that the \nperson responsible has fixed the vulnerability [b]. You document this in a plan of action that \nis updated as milestones are reached [b]. You have a separate resource review the \nmodifications after they have been completed to ensure the plan has been implemented \ncorrectly [c].",
    },
    fd_pac: [
      "Is there an action plan to remediate identified weaknesses or deficiencies [a]?68",
      "Is the action plan maintained as remediation is performed [b]?69",
      "Does the action plan designate remediation dates and milestones for each item [c]?70",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.12.2"],
  },
  {
    id: 86,
    level: 2,
    section: "3.12.3",
    section_name: "SECURITY CONTROL MONITORING ",
    brief_description:
      "Monitor security controls on an ongoing basis to ensure the continued effectiveness of the \ncontrols. \n",
    assessment_objectives: {
      a: "security controls are monitored on an ongoing basis to ensure the continued \neffectiveness of those controls.",
    },
    examine:
      "[SELECT FROM: Security planning policy; organizational procedures addressing system \nsecurity plan development and implementation; procedures addressing system security \nplan reviews and updates; enterprise architecture documentation; system security plan; \nrecords of system security plan reviews and updates; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with security planning and system security plan implementation \nresponsibilities; personnel with information security responsibilities]",
    test: "[SELECT FROM: Organizational processes for system security plan development, review, \nupdate, and approval; mechanisms supporting the system security plan]",
    discussion:
      "Continuous monitoring programs facilitate ongoing awareness of threats, vulnerabilities, \nand information security to support organizational risk management decisions. The terms \ncontinuous and ongoing imply that organizations assess and analyze security controls and \ninformation security-related risks at a frequency sufficient to support risk-based decisions. \nThe results of continuous monitoring programs generate appropriate risk response actions \nby organizations. Providing access to security information on a continuing basis through \nreports or dashboards gives organizational officials the capability to make effective and \ntimely risk management decisions. Automation supports more frequent updates to \nhardware, software, firmware inventories, and other system information. Effectiveness is \nfurther enhanced when continuous monitoring outputs are formatted to provide \ninformation that is specific, measurable, actionable, relevant, and timely. Monitoring \nrequirements, including the need for specific monitoring, may also be referenced in other \nrequirements. \nNIST SP 800-137 provides guidance on continuous monitoring.",
    further_discussion:
      "Provide a plan for monitoring the state of security controls on a recurring basis that occurs \nmore frequently than the periodic assessments discussed in CA.L2-3.12.1. This process \nprovides a mechanism to assess the overall security posture of your organization, which \ndirectly relates to activities discussed in CA.L2-3.12.4. As a result, the process not only \nmaintains awareness of vulnerabilities and threats, but it also informs management of the \neffectiveness of the security controls in determining if security controls are current and for \nmanagement to make an acceptable risk decision.",
    fd_examples: {
      Example:
        "You are responsible for ensuring your company fulfills all cybersecurity requirements for its \nDoD contracts. You review those requirements and the security controls your company has \nput in place to meet them. You then create a plan to evaluate each control regularly over the \nnext year. You mark several controls to be evaluated by a third-party security assessor. You \nassign other IT resources in the organization to evaluate controls within their area of \nresponsibility. To ensure progress you establish recurring meetings with the accountable IT \nstaff to assess continuous monitoring progress, review security information, evaluate risks \nfrom gaps in continuous monitoring, and produce reports for your management [a].",
    },
    fd_pac: [
      "Are the security controls that need to be continuously monitored identified [a]?",
      "Is the timeframe for continuous monitoring activities to support risk-based decision \nmaking defined [a]?",
      "Is the output of continuous monitoring activities provided to stakeholders [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.12.3"],
  },
  {
    id: 87,
    level: 2,
    section: "3.12.4",
    section_name: "SYSTEM SECURITY PLAN ",
    brief_description:
      "Develop, document, and periodically update system security plans that describe system \nboundaries, system environments of operation, how security requirements are \nimplemented, and the relationships with or connections to other systems. \n",
    assessment_objectives: {
      a: "a system security plan is developed;",
      b: "the system boundary is described and documented in the system security plan;",
      c: "the system environment of operation is described and documented in the system \nsecurity plan;",
      d: "the security requirements identified and approved by the designated authority as \nnon-applicable are identified;",
      e: "the method of security requirement implementation is described and documented in \nthe system security plan;",
      f: "the relationship with or connection to other systems is described and documented in \nthe system security plan;",
      g: "the frequency to update the system security plan is defined; and",
      h: "system security plan is updated with the defined frequency.",
    },
    examine:
      "[SELECT FROM: Security planning policy; procedures addressing system security plan \ndevelopment and implementation; procedures addressing system security plan reviews and \nupdates; enterprise architecture documentation; system security plan; records of system \nsecurity plan reviews and updates; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with security planning and system security plan implementation \nresponsibilities; personnel with information security responsibilities]",
    test: "[SELECT FROM: Organizational processes for system security plan development, review, \nupdate, and approval; mechanisms supporting the system security plan]",
    discussion:
      "System security plans relate security requirements to a set of security controls. System \nsecurity plans also describe, at a high level, how the security controls meet those security \nrequirements, but do not provide detailed, technical descriptions of the design or \nimplementation of the controls. System security plans contain sufficient information to \nenable a design and implementation that is unambiguously compliant with the intent of the \nplans and subsequent determinations of risk if the plan is implemented as intended. Security \nplans need not be single documents; the plans can be a collection of various documents \nincluding documents that already exist. Effective security plans make extensive use of \nreferences to policies, procedures, and additional documents (e.g., design and \nimplementation specifications) where more detailed information can be obtained. This \nreduces the documentation requirements associated with security programs and maintains \nsecurity-related information in other established management/operational areas related to \nenterprise architecture, system development life cycle, systems engineering, and acquisition. \nFederal agencies may consider the submitted system security plans and plans of action as \ncritical inputs to an overall risk management decision to process, store, or transmit CUI on a \nsystem hosted by a nonfederal organization and whether it is advisable to pursue an \nagreement or contract with the nonfederal organization. \nNIST SP 800-18 provides guidance on developing security plans.",
    further_discussion:
      "A system security plan (SSP) is a document that outlines how an organization implements \nits security requirements. At a minimum, an SSP must include: \n Description of the CMMC Assessment Scope as discussed in Error! Reference source \nnot found.; \n CMMC Assessment Scope Description: high-level description of the assets within the \nassessment scope; \n Description of the Environment of Operation: physical surroundings in which an \ninformation system processes, stores, and transmits information; \n Identified and Approved Security Requirements: requirements levied on an information \nsystem that are derived from applicable laws, Executive Orders, directives, policies, \nstandards, instructions, regulations, procedures, or organizational mission/business \ncase needs to ensure the confidentiality, integrity, and availability of the information \nbeing processed, stored, or transmitted; \n Implementation Method for Security Requirements: description of how the identified \nand approved security requirements are implemented with the system or environment; \n Connections and Relationships to Other Systems and Networks: description of related, \ndependent, and interconnected systems; and \n Defined Frequency of Updates: typically at least annually. \nIn addition to the requirements above, an SSP often includes: \n general information system description: technical and functional description; \n design philosophies: defense-in-depth strategies and allowed interfaces and network \nprotocols; and \n roles and responsibilities: description of the roles and responsibilities for key personnel, \nwhich may include the system owner, system custodian, authorizing officials, and other \nstakeholders \nThis practice, CA.L2-3.12.4, which requires developing, documenting, and updating system \nsecurity plans, promotes effective information security within organizational systems \nrequired by SC.L2-3.13.2, as well as other system and communications protection practices.",
    fd_examples: {
      Example:
        "You are in charge of system security. You develop an SSP and have senior leadership formally \napprove the document [a]. The SSP explains how your organization handles CUI and defines \nhow that data is stored, transmitted, and protected [d,e]. The criteria outlined in the SSP is \nused to guide configuration of the network and other information resources to meet your \ncompany’s goals. Knowing that it is important to keep the SSP current, you establish a policy \nthat requires a formal review and update of the SSP each year [g,h].",
    },
    fd_pac: [
      "Do mechanisms exist to develop and periodically update an SSP [a,g]?",
      "Are security requirements identified and approved by the designated authority as \nnon-applicable documented [d]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.12.4"],
  },
  {
    id: 88,
    level: 1,
    section: "3.13.1",
    section_name: "BOUNDARY PROTECTION ",
    brief_description:
      "Monitor, control, and protect organizational communications (i.e., information transmitted \nor received by organizational information systems) at the external boundaries and key \ninternal boundaries of the information systems. \n",
    assessment_objectives: {
      a: "the external system boundary is defined;",
      b: "key internal system boundaries are defined;",
      c: "communications are monitored at the external system boundary;",
      d: "communications are monitored at key internal boundaries;",
      e: "communications are controlled at the external system boundary;",
      f: "communications are controlled at key internal boundaries;",
      g: "communications are protected at the external system boundary; and",
      h: "communications are protected at key internal boundaries.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \nboundary protection; system security plan; list of key internal boundaries of the system; \nsystem design documentation; boundary protection hardware and software; enterprise \nsecurity architecture documentation; system audit logs and records; system configuration \nsettings and associated documentation; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developers; personnel with boundary protection responsibilities]",
    test: "[SELECT FROM: Mechanisms implementing boundary protection capability]",
    discussion:
      "Communications can be monitored, controlled, and protected at boundary components and \nby restricting or prohibiting interfaces in organizational systems. Boundary components \ninclude gateways, routers, firewalls, guards, network-based malicious code analysis and \nvirtualization systems, or encrypted tunnels implemented within a system security \narchitecture (e.g., routers protecting firewalls or application gateways residing on protected \nsubnetworks). Restricting or prohibiting interfaces in organizational systems includes \nrestricting external web communications traffic to designated web servers within managed \ninterfaces and prohibiting external traffic that appears to be spoofing internal addresses. \nOrganizations consider the shared nature of commercial telecommunications services in the \nimplementation of security requirements associated with the use of such services. \nCommercial telecommunications services are commonly based on network components and \nconsolidated management systems shared by all attached commercial customers and may \nalso include third party-provided access lines and other service elements. Such transmission \nservices may represent sources of increased risk despite contract security provisions. NIST \nSP 800-41 provides guidance on firewalls and firewall policy. NIST SP 800-125B provides \nguidance on security for virtualization technologies.",
    further_discussion:
      "Fences, locks, badges, and key cards help keep non-employees out of your physical facilities. \nSimilarly, your company’s IT network or system has boundaries that must be protected. \nMany companies use a web proxy and a firewall.  \nWhen an employee uses a company computer to go to a website, a web proxy makes the \nrequest on the user’s behalf, looks at the web request, and decides if it should let the \nemployee go to the website. \nA firewall controls access from the inside and outside, protecting valuable information and \nresources stored on the company’s network. A firewall stops unwanted traffic on the internet \nfrom passing through an outside “fence” to the company’s networks and information \nsystems. Internal boundaries determine where data can flow, for instance a software \ndevelopment environment may have its own boundary controlling, monitoring, and \nprotecting the data that can leave that boundary. \nYou may want to monitor, control, or protect one part of the company network from another. \nThis can also be accomplished with a firewall and limits the ability of attackers and \ndisgruntled employees from entering sensitive parts of your internal network and causing \ndamage.",
    fd_examples: {
      Example:
        "You are setting up the new network and want to keep your company’s information and \nresources safe. You start by sketching out a simple diagram that identifies the external \nboundary of your network and any internal boundaries that are needed [a,b]. The first piece \nof equipment you install is the firewall, a device to separate your internal network from the \ninternet. The firewall also has a feature that allows you to block access to potentially \nmalicious websites, and you configure that service as well [a,c,e,g]. Some of your coworkers \ncomplain that they cannot get onto certain websites [c,e,g]. You explain that the new network \nblocks websites that are known for spreading malware. The firewall sends you a daily digest \nof blocked activity so that you can monitor the system for attack trends [c,d].",
    },
    fd_pac: [
      "What are the external system boundary components that make up the entry and exit \npoints for data flow (e.g., firewalls, gateways, cloud service boundaries), behind which all \nsystem components that handle regulated data are contained? What are the supporting \nsystem components necessary for the protection of regulated data [a]?",
      "What are the internal system boundary components that make up the entry and exit \npoints for key internal data flow (e.g., internal firewalls, routers, any devices that can \nbridge the connection between one segment of the system and another) that separate \nsegments of the internal network – including devices that separate internal network \nsegments such as development and production networks as well as a traditional \nDemilitarized Zone (DMZ) at the edge of the network [b]?",
      "Is data flowing in and out of the external and key internal system boundaries monitored \n(e.g., connections are logged and able to be reviewed, suspicious traffic generates alerts) \n[c,d]?",
      "Is data traversing the external and internal system boundaries controlled such that \nconnections are denied by default and only authorized connections are allowed [e,f]?",
      "Is data flowing in and out of the external and key internal system boundaries protected \n(e.g., applying encryption when required or prudent, tunneling traffic as needed) [g,h]?",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.x",
      "NIST SP 800-171 Rev 2 3.13.1-Access System Separation",
    ],
  },
  {
    id: 89,
    level: 1,
    section: "3.13.5",
    section_name: "PUBLIC-ACCESS SYSTEM SEPARATION ",
    brief_description:
      "Implement subnetworks for publicly accessible system components that are physically or \nlogically separated from internal networks. \n",
    assessment_objectives: {
      a: "publicly accessible system components are identified; and",
      b: "subnetworks for publicly accessible system components are physically or logically \nseparated from internal networks.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \nboundary protection; system security plan; list of key internal boundaries of the system; \nsystem design documentation; boundary protection hardware and software; system \nconfiguration settings and associated documentation; enterprise security architecture \ndocumentation; system audit logs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developers; personnel with boundary protection responsibilities]",
    test: "[SELECT FROM: Mechanisms implementing boundary protection capability]",
    discussion:
      "Subnetworks that are physically or logically separated from internal networks are referred \nto as demilitarized zones (DMZs). DMZs are typically implemented with boundary control \ndevices and techniques that include routers, gateways, firewalls, virtualization, or cloud-\nbased technologies. \nNIST SP 800-41 provides guidance on firewalls and firewall policy. SP 800-125B provides \nguidance on security for virtualization technologies.",
    further_discussion:
      "Separate the publicly accessible systems from the internal systems that need to be protected. \nDo not place internal systems on the same network as the publicly accessible systems and \nblock access by default from DMZ networks to internal networks.-Access System Separation \nOne method of accomplishing this is to create a DMZ network, which enhances security by \nproviding public access to a specific set of resources while preventing connections from \nthose resources to the rest of the IT environment. Some contractors achieve a similar result \nthrough the use of a cloud computing environment that is separated from the rest of the \ncompany’s infrastructure.",
    fd_examples: {
      Example:
        "The head of recruiting at your company wants to launch a website to post job openings and \nallow the public to download an application form [a]. After some discussion, your team \nrealizes it needs to use a firewall to create a perimeter network to do this [b]. You host the \nserver separately from the company’s internal network and make sure the network on which \nit resides is isolated with the proper firewall rules [b].",
    },
    fd_pac: [
      "Are any system components reachable by the public (e.g., internet-facing web servers, \nVPN gateways, publicly accessible cloud services) [a]?",
      "Are publicly accessible system components on physically or logically separated \nsubnetworks (e.g., isolated subnetworks using separate, dedicated VLAN segments such \nas DMZs) [b]?",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.xi",
      "NIST SP 800-171 Rev 2 3.13.5",
    ],
  },
  {
    id: 90,
    level: 2,
    section: "3.13.2",
    section_name: "SECURITY ENGINEERING ",
    brief_description:
      "Employ architectural designs, software development techniques, and systems engineering \nprinciples that promote effective information security within organizational systems. \n",
    assessment_objectives: {
      a: "architectural designs that promote effective information security are identified;",
      b: "software development techniques that promote effective information security are \nidentified;",
      c: "systems engineering principles that promote effective information security are \nidentified;",
      d: "identified architectural designs that promote effective information security are \nemployed;",
      e: "identified software development techniques that promote effective information \nsecurity are employed; and",
      f: "identified systems engineering principles that promote effective information security \nare employed.",
    },
    examine:
      "[SELECT FROM: Security planning policy; procedures addressing system security plan \ndevelopment and implementation; procedures addressing system security plan reviews and \nupdates; enterprise architecture documentation; system security plan; records of system \nsecurity plan reviews and updates; system and communications protection policy; \nprocedures addressing security engineering principles used in the specification, design, \ndevelopment, implementation, and modification of the system; security architecture \ndocumentation; security requirements and specifications for the system; system design \ndocumentation; system configuration settings and associated documentation; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: Personnel with responsibility for determining information system security \nrequirements; personnel with information system design, development, implementation, \nand modification responsibilities; personnel with security planning and system security plan \nimplementation responsibilities; personnel with information security responsibilities]",
    test: "[SELECT FROM: Organizational processes for system security plan development, review, \nupdate, and approval; mechanisms supporting the system security plan; processes for \napplying security engineering principles in system specification, design, development, \nimplementation, and modification; automated mechanisms supporting the application of \nsecurity engineering principles in information system specification, design, development, \nimplementation, and modification]",
    discussion:
      "Organizations apply systems security engineering principles to new development systems \nor systems undergoing major upgrades. For legacy systems, organizations apply systems \nsecurity engineering principles to system upgrades and modifications to the extent feasible, \ngiven the current state of hardware, software, and firmware components within those \nsystems. The application of systems security engineering concepts and principles helps to \ndevelop trustworthy, secure, and resilient systems and system components and reduce the \nsusceptibility of organizations to disruptions, hazards, and threats. Examples of these \nconcepts and principles include developing layered protections; establishing security \npolicies, architecture, and controls as the foundation for design; incorporating security \nrequirements into the system development life cycle; delineating physical and logical \nsecurity boundaries; ensuring that developers are trained on how to build secure software; \nand performing threat modeling to identify use cases, threat agents, attack vectors and \npatterns, design patterns, and compensating controls needed to mitigate risk. Organizations \nthat apply security engineering concepts and principles can facilitate the development of \ntrustworthy, secure systems, system components, and system services; reduce risk to \nacceptable levels; and make informed risk-management decisions. \nNIST SP 800-160-1 provides guidance on systems security engineering.",
    further_discussion:
      "Familiarity with security engineering principles and their successful application to your \ninfrastructure will increase the security of your environment. NIST SP 800-160 System \nSecurity Engineering: Considerations for a Multidisciplinary Approach in the Engineering of \nTrustworthy Secure Systems can serve as a source of security engineering and design \nprinciples. \nDecide which designs and principles to apply. Some will not be possible or appropriate for a \ngiven company or for specific systems or components. \nDesigns and principles should be applied to policies and security standards. Starting with \nthe baseline configuration, they should be extended through all layers of the technology \nstack (e.g., hardware, software, firmware) and throughout all the components of the \ninfrastructure. The application of these chosen designs and principles should drive you \ntowards a secure architecture with the required security capabilities and intrinsic behaviors \npresent throughout the lifecycle of your technology. \nAs legacy components age, it may become increasingly difficult for those components to meet \nsecurity principles and requirements. This should factor into life-cycle decisions for those \ncomponents (e.g., replacing legacy hardware, upgrading or re-writing software, upgrading \nrun-time environments).",
    fd_examples: {
      Example:
        "You are responsible for developing strategies to protect data and harden your infrastructure. \nYou are on a team responsible for performing a major upgrade to a legacy system. You refer \nto your documented security engineering principles [c]. Reviewing each, you decide which \nare appropriate and applicable [c]. You apply the chosen designs and principles when \ncreating your design for the upgrade [f]. \nYou document the security requirements for the software and hardware changes to ensure \nthe principles are followed. You review the upgrade at critical points in the workflow to \nensure the requirements are met. You assist in updating the policies covering the use of the \nupgraded system so user behavior stays aligned with the principles.",
    },
    fd_pac: [
      "Does the organization have a defined system architecture [a,d]?",
      "Are system security engineering principles applied in the specification, design, \ndevelopment and implementation of the systems [d,e,f]?71",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.13.2"],
  },
  {
    id: 91,
    level: 2,
    section: "3.13.3",
    section_name: "ROLE SEPARATION ",
    brief_description:
      "Separate user functionality from system management functionality. \n",
    assessment_objectives: {
      a: "user functionality is identified;",
      b: "system management functionality is identified; and",
      c: "user functionality is separated from system management functionality.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \napplication partitioning; system design documentation; system configuration settings and \nassociated documentation; system security plan; system audit logs and records; other \nrelevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developer]",
    test: "[SELECT FROM: Separation of user functionality from system management functionality]",
    discussion:
      "System management functionality includes functions necessary to administer databases, \nnetwork components, workstations, or servers, and typically requires privileged user access. \nThe separation of user functionality from system management functionality is physical or \nlogical. Organizations can implement separation of system management functionality from \nuser functionality by using different computers, different central processing units, different \ninstances of operating systems, or different network addresses; virtualization techniques; or \ncombinations of these or other methods, as appropriate. This type of separation includes \nweb administrative interfaces that use separate authentication methods for users of any \nother system resources. Separation of system and user functionality may include isolating \nadministrative interfaces on different domains and with additional access controls.",
    further_discussion:
      "Prevent users and user services from accessing system management functionality on IT \ncomponents (e.g., databases, network components, workstations, servers). This reduces the \nattack surface to those critical interfaces by limiting who can access and how they can be \naccessed. By separating the user functionality from system management functionality, the \nadministrator or privileged functions are not available to the general user. \nThe intent of this practice is to ensure: \n general users are not permitted to perform system administration functions; and \n system administrators only perform system administration functions from their \nprivileged account. \nThis can be accomplished using separation like VLANs or logical separation using strong \naccess control methods.",
    fd_examples: {
      Example:
        "As a system administrator, you are responsible for managing a number of core systems. \nPolicy prevents you from conducting any administration from the computer or system \naccount you use for day-to-day work [a,b]. The servers you manage also are isolated from \nthe main corporate network. To work with them you use a special unique account to connect \nto a “jump” server that has access to the systems you routinely administer.",
    },
    fd_pac: [
      "Are physical or logical controls used to separate user functionality from system \nmanagement-related functionality (e.g., to ensure that administration (e.g., privilege) \noptions are not available to general users) [c]?72",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.13.3"],
  },
  {
    id: 92,
    level: 2,
    section: "3.13.4",
    section_name: "SHARED RESOURCE CONTROL ",
    brief_description:
      "Prevent unauthorized and unintended information transfer via shared system resources. \n",
    assessment_objectives: {
      a: "unauthorized and unintended information transfer via shared system resources is \nprevented.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \napplication partitioning; system security plan; system design documentation; system \nconfiguration settings and associated documentation; system audit logs and records; other \nrelevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developer]",
    test: "[SELECT FROM: Separation of user functionality from system management functionality]",
    discussion:
      "The control of information in shared system resources (e.g., registers, cache memory, main \nmemory, hard disks) is also commonly referred to as object reuse and residual information \nprotection. This requirement prevents information produced by the actions of prior users or \nroles (or the actions of processes acting on behalf of prior users or roles) from being available \nto any current users or roles (or current processes acting on behalf of current users or roles) \nthat obtain access to shared system resources after those resources have been released back \nto the system. This requirement also applies to encrypted representations of information. \nThis requirement does not address information remnants, which refers to residual \nrepresentation of data that has been nominally deleted; covert channels (including storage \nor timing channels) where shared resources are manipulated to violate information flow \nrestrictions; or components within systems for which there are only single users or roles.",
    further_discussion:
      "No shared system resource, such as cache memory, hard disks, registers, or main memory \nmay pass information from one user to another user. In other words, when objects are \nreused no residual information should exist on that object. This protects the confidentiality \nof the information. This is typically a feature provided by operating system and software \nvendors.",
    fd_examples: {
      Example:
        "You are a system administrator responsible for creating and deploying the system hardening \nprocedures for your company’s computers. You ensure that the computer baselines include \nsoftware patches to prevent attackers from exploiting flaws in the processor architecture to \nread data (e.g., the Meltdown and Spectre exploits). You also verify that the computer \noperating system is configured to prevent users from accessing other users’ folders [a].",
    },
    fd_pac: ["Are shared system resources identified and documented [a]?"],
    key_references: ["NIST SP 800-171 Rev 2 3.13.4"],
  },
  {
    id: 93,
    level: 2,
    section: "3.13.6",
    section_name: "NETWORK COMMUNICATION BY EXCEPTION ",
    brief_description:
      "Deny network communications traffic by default and allow network communications traffic \nby exception (i.e., deny all, permit by exception). \n",
    assessment_objectives: {
      a: "network communications traffic is denied by default; and",
      b: "network communications traffic is allowed by exception.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \nboundary protection; system security plan; system design documentation; system \nconfiguration settings and associated documentation; system audit logs and records; other \nrelevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developer; personnel with boundary protection responsibilities]",
    test: "[SELECT FROM: Mechanisms implementing traffic management at managed interfaces]",
    discussion:
      "This requirement applies to inbound and outbound network communications traffic at the \nsystem boundary and at identified points within the system. A deny-all, permit-by-exception \nnetwork communications traffic policy ensures that only those connections which are \nessential and approved are allowed.",
    further_discussion:
      "Block all traffic entering and leaving the network, but permit specific traffic based on \norganizational policies, exceptions, or criteria. This process of permitting only authorized \ntraffic to the network is called whitelisting and limits the number of unintentional \nconnections to the network. \nThis practice, SC.L2-3.13.6, requires a deny-all permit by exception approach for all network \ncommunications. In doing so, it adds specifics for SC.L1-3.13.1, which only requires \nmonitoring, control, and protection of communication channels.",
    fd_examples: {
      Example:
        "You are setting up a new environment to house CUI. To properly isolate the CUI network, you \ninstall a firewall between it and other networks and set the firewall rules to deny all traffic \n[a]. You review each service and application that runs in the new environment and determine \nthat you only need to allow http and https traffic outbound [b]. You test the functionality of \nthe required services and make some needed adjustments, then comment each firewall rule \nso there is documentation of why it is required. You review the firewall rules on a regular \nbasis to make sure no unauthorized changes were made.",
    },
    fd_pac: [
      "Are network communications traffic on relevant system components (e.g., host and \nnetwork firewalls, routers, gateways) denied by default (e.g., configured with an implicit \ndeny rule that takes effect in the absence of any other matching traffic rules) [a]?",
      "Are network communications traffic on relevant system components (e.g., host and \nnetwork firewalls, routers, gateways) allowed by exception (e.g., configured with explicit \nallow rules that takes effect only when network traffic matches one or more rules) [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.13.6"],
  },
  {
    id: 94,
    level: 2,
    section: "3.13.7",
    section_name: "SPLIT TUNNELING ",
    brief_description:
      "Prevent remote devices from simultaneously establishing non-remote connections with \norganizational systems and communicating via some other connection to resources in \nexternal networks (i.e., split tunneling). \n",
    assessment_objectives: {
      a: "remote devices are prevented from simultaneously establishing non-remote \nconnections with the system and communicating via some other connection to \nresources in external networks (i.e., split tunneling).",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \nboundary protection; system security plan; system design documentation; system hardware \nand software; system architecture; system configuration settings and associated \ndocumentation; system audit logs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developer; personnel with boundary protection responsibilities]",
    test: "[SELECT FROM: Mechanisms implementing boundary protection capability; mechanisms \nsupporting or restricting non-remote connections]",
    discussion:
      "Split tunneling might be desirable by remote users to communicate with local system \nresources such as printers or file servers. However, split tunneling allows unauthorized \nexternal connections, making the system more vulnerable to attack and to exfiltration of \norganizational information. This requirement is implemented in remote devices (e.g., \nnotebook computers, smart phones, and tablets) through configuration settings to disable \nsplit tunneling in those devices, and by preventing configuration settings from being readily \nconfigurable by users. This requirement is implemented in the system by the detection of \nsplit tunneling (or of configuration settings that allow split tunneling) in the remote device, \nand by prohibiting the connection if the remote device is using split tunneling.",
    further_discussion:
      "Split tunneling for a remote user utilizes two connections: accessing resources on the \ninternal network via a VPN and simultaneously accessing an external network such as a \npublic network or the internet.  \nSplit tunneling presents a potential opportunity where an open unencrypted connection \nfrom a public network could allow an adversary to access resources on internal network. As \na mitigation strategy, the split tunneling setting should be disabled on all devices so that all \ntraffic, including traffic for external networks or the internet, goes through the VPN.",
    fd_examples: {
      Example:
        "You are a system administrator responsible for configuring the network to prevent remote \nusers from using split tunneling. You review the configuration of remote user laptops. You \ndiscover that remote users are able to access files, email, database and other services \nthrough the VPN connection while also being able to print and access resources on their local \nnetwork. You change the configuration settings for all company computers to disable split \ntunneling [a]. You test a laptop that has had the new hardening procedures applied and verify \nthat all traffic from the laptop is now routed through the VPN connection.",
    },
    fd_pac: [
      "Does the system prevent remote devices that have established connections (e.g., remote \nlaptops) with the system from communicating outside that communications path with \nresources on uncontrolled/unauthorized networks [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.13.7"],
  },
  {
    id: 95,
    level: 2,
    section: "3.13.8",
    section_name: "DATA IN TRANSIT ",
    brief_description:
      "Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI during \ntransmission unless otherwise protected by alternative physical safeguards. \n",
    assessment_objectives: {
      a: "cryptographic mechanisms intended to prevent unauthorized disclosure of CUI are \nidentified;",
      b: "alternative physical safeguards intended to prevent unauthorized disclosure of CUI are \nidentified; and",
      c: "either cryptographic mechanisms or alternative physical safeguards are implemented \nto prevent unauthorized disclosure of CUI during transmission.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \ntransmission confidentiality and integrity; system security plan; system design \ndocumentation; system configuration settings and associated documentation; system audit \nlogs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developer]",
    test: "[SELECT FROM: Cryptographic mechanisms or mechanisms supporting or implementing \ntransmission confidentiality; organizational processes for defining and implementing \nalternative physical safeguards]",
    discussion:
      "This requirement applies to internal and external networks and any system components that \ncan transmit information including servers, notebook computers, desktop computers, \nmobile devices, printers, copiers, scanners, and facsimile machines. Communication paths \noutside the physical protection of controlled boundaries are susceptible to both interception \nand modification. Organizations relying on commercial providers offering transmission \nservices as commodity services rather than as fully dedicated services (i.e., services which \ncan be highly specialized to individual customer needs), may find it difficult to obtain the \nnecessary assurances regarding the implementation of the controls for transmission \nconfidentiality. In such situations, organizations determine what types of confidentiality \nservices are available in commercial telecommunication service packages. If it is infeasible \nor impractical to obtain the necessary safeguards and assurances of the effectiveness of the \nsafeguards \nthrough \nappropriate \ncontracting \nvehicles, \norganizations \nimplement \ncompensating safeguards or explicitly accept the additional risk. An example of an \nalternative physical safeguard is a protected distribution system (PDS) where the \ndistribution medium is protected against electronic or physical intercept, thereby ensuring \nthe confidentiality of the information being transmitted.",
    further_discussion:
      "The intent of this practice is to ensure CUI is cryptographically protected during transit, \nparticularly on the internet. The most common way to accomplish this is to establish a TLS \ntunnel between the source and destination using the most current version of TLS. This \npractice does not specify a mutually authenticated handshake, but mutual authentication is \nthe most secure approach to creating a tunnel. \nWhen CMMC requires cryptography, it is to protect the confidentiality of CUI. FIPS-validated \ncryptography means the cryptographic module has to have been tested and validated to \nmeet FIPS 140-1 or-2 requirements. Simply using an approved algorithm is not sufficient – \nthe module (software and/or hardware) used to implement the algorithm must be \nseparately validated under FIPS 140. Accordingly, FIPS-validated cryptography is required \nto meet CMMC practices that protect CUI when transmitted or stored outside the protected \nenvironment of the covered contractor information system (including wireless/remote \naccess). Encryption used for other purposes, such as within applications or devices within \nthe protected environment of the covered contractor information system, would not need to \nbe FIPS-validated. \nThis practice, SC.L2-3.13.8, requires cryptographic mechanisms be used to prevent the \ndisclosure of CUI in-transit and leverages SC.L2-3.13.11, which specifies that the algorithms \nused must be FIPS-validated.",
    fd_examples: {
      Example:
        "You are a system administrator responsible for configuring encryption on all devices that \ncontain CUI. Because your users regularly store CUI on laptops and take them out of the \noffice, you encrypt the hard drives with a FIPS-validated encryption tool built into the \noperating system. For users who need to share CUI, you install a Secure FTP server to allow \nCUI to be transmitted in a compliant manner [a]. You verify that the server is using a FIPS-\nvalidated encryption module by checking the NIST Cryptographic Module Validation \nProgram website [c]. You turn on the “FIPS Compliance” setting for the server during \nconfiguration because that is what is required for this product in order to use only FIPS-\nvalidated cryptography [c].",
    },
    fd_pac: [
      "Are cryptographic mechanisms used to prevent unauthorized disclosure of information \nduring transmission unless otherwise protected by alternative physical measures (e.g., \nPDS) [c]?73 \n                                                           \n73 NIST Handbook 162 Section 3.13.8",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.13.8"],
  },
  {
    id: 96,
    level: 2,
    section: "3.13.9",
    section_name: "CONNECTIONS TERMINATION ",
    brief_description:
      "Terminate network connections associated with communications sessions at the end of the \nsessions or after a defined period of inactivity. \n",
    assessment_objectives: {
      a: "a period of inactivity to terminate network connections associated with \ncommunications sessions is defined;",
      b: "network connections associated with communications sessions are terminated at the \nend of the sessions; and",
      c: "network connections associated with communications sessions are terminated after the \ndefined period of inactivity.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \nnetwork disconnect; system design documentation; system security plan; system \nconfiguration settings and associated documentation; system audit logs and records; other \nrelevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developer]",
    test: "[SELECT FROM: Mechanisms supporting or implementing network disconnect capability]",
    discussion:
      "This requirement applies to internal and external networks. Terminating network \nconnections associated with communications sessions include de-allocating associated \nTCP/IP address or port pairs at the operating system level, or de-allocating networking \nassignments at the application level if multiple application sessions are using a single, \noperating system-level network connection. Time periods of user inactivity may be \nestablished by organizations and include time periods by type of network access or for \nspecific network accesses.",
    further_discussion:
      "Prevent malicious actors from taking advantage of an open network session or an \nunattended computer at the end of the connection. Balance user work patterns and needs \nagainst security to determine the length of inactivity that will force a termination. \nThis practice, SC.L2-3.13.9, requires network connections be terminated under certain \nconditions, which complements AC.L2-3.1.18 that requires control of mobile device \nconnections.",
    fd_examples: {
      Example:
        "You are an administrator of a server that provides remote access. Your company’s policies \nstate that network connections must be terminated after being idle for 60 minutes [a]. You \nedit the server configuration file and set the timeout to 60 minutes and restart the remote \naccess software [c]. You test the software and verify that the connection is terminated \nappropriately.",
    },
    fd_pac: [
      "Are the network connections requiring management and time-out for inactivity \ndocumented [a]?",
      "Are the network connections requiring management and time-out for inactivity \nconfigured and implemented [c]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.13.9"],
  },
  {
    id: 97,
    level: 2,
    section: "3.13.10",
    section_name: "KEY MANAGEMENT ",
    brief_description:
      "Establish and manage cryptographic keys for cryptography employed in organizational \nsystems. \n",
    assessment_objectives: {
      a: "cryptographic keys are established whenever cryptography is employed; and",
      b: "cryptographic keys are managed whenever cryptography is employed.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \ncryptographic key establishment and management; system security plan; system design \ndocumentation; cryptographic mechanisms; system configuration settings and associated \ndocumentation; system audit logs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; personnel with responsibilities for cryptographic key establishment and \nmanagement]",
    test: "[SELECT FROM: Mechanisms supporting or implementing cryptographic key establishment \nand management]",
    discussion:
      "Cryptographic key management and establishment can be performed using manual \nprocedures or mechanisms supported by manual procedures. Organizations define key \nmanagement requirements in accordance with applicable federal laws, Executive Orders, \npolicies, directives, regulations, and standards specifying appropriate options, levels, and \nparameters. \nNIST SP 800-56A and NIST SP 800-57-1 provide guidance on cryptographic key management \nand key establishment.",
    further_discussion:
      "Develop processes and technical mechanisms to protect the cryptographic keys’ \nconfidentiality, authenticity, and authorized use in accordance with industry standards and \nregulations. Key management systems provide oversight, assurance, and the capability to \ndemonstrate the cryptographic keys are created in a secure manner and protected from loss \nor misuse throughout their lifecycle (e.g., active, expired, revoked). For a small number of \nkeys, this can be accomplished with manual procedures and mechanisms. As the number of \nkeys and cryptographic units increase, automation and tool support will be required. \nThe first intent of this practice is to ensure cryptographic keys are properly created in a \nsecure manner that prevents them from being reproduced by an adversary. The second \nintent of this practice is to ensure cryptographic keys are managed in a secure manner that \nprevents them from being stolen by an adversary. \nKey establishment involves the creation of keys and coordination among parties that will use \nthe keys of the methodology for generating the final keying material. This is discussed in \ndetail in SP 800-56A, B, and C. \nKey management involves protecting keys when they are distributed, when they are stored, \nwhen they are being used, and when they are being recovered. \nKey establishment best practices are identified in NIST SP 800-56A, B, and C. Key \nmanagement best practices are identified in NIST SP 800-57 Parts 1, 2, and 3.  \nThis practice, SC.L2-3.13.10, complements AC.L2-3.1.19 by specifying that any cryptographic \nkeys in use must be protected.",
    fd_examples: {
      "Example 1":
        "You are a system administrator responsible for providing key management. You have \ngenerated a public-private key pair to exchange CUI [a]. You require all system \nadministrators to read the key management policy before you allow them to install the \nprivate key on their machines [b]. No one else is allowed to know or have a copy of the private \nkey per the policy. You provide the public key to the other parties who will be sending you \nCUI and test the Public Key Infrastructure (PKI) to ensure the encryption is working [a]. You \nset a revocation period of one year on all your certificates per organizational policy [b].",
      "Example 2":
        "You encrypt all of your company’s computers using the disk encryption utility built into the \noperating system. As you configure encryption on each device, it generates a cryptographic \nkey. You associate each key with the correct computer in your inventory spreadsheet and \nrestrict access to the spreadsheet to the system administrators whose work role requires \nthem to manage the computers [b].",
    },
    fd_pac: [
      "Are cryptographic keys established whenever cryptography is employed (e.g., digital \nsignatures, \nauthentication, \nauthorization, \ntransport, \nor \nother \ncryptographic \nmechanisms) [a]?",
      "Are cryptographic keys maintained whenever cryptography is employed (e.g., key \nstorage, backup, recovery, revocation, destruction, etc.) [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.13.10"],
  },
  {
    id: 98,
    level: 2,
    section: "3.13.11",
    section_name: "CUI E",
    brief_description:
      "ncryption \nSC.L2-3.13.11 – CUI ENCRYPTION \nEmploy FIPS-validated cryptography when used to protect the confidentiality of CUI. \n",
    assessment_objectives: {
      a: "FIPS-validated cryptography is employed to protect the confidentiality of CUI.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \ncryptographic protection; system security plan; system design documentation; system \nconfiguration settings and associated documentation; cryptographic module validation \ncertificates; list of FIPS-validated cryptographic modules; system audit logs and records; any \nother relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developers; personnel with responsibilities for cryptographic \nprotection]",
    test: "[SELECT FROM: Mechanisms supporting or implementing cryptographic protection]",
    discussion:
      "Cryptography can be employed to support many security solutions including the protection \nof controlled unclassified information, the provision of digital signatures, and the \nenforcement of information separation when authorized individuals have the necessary \nclearances for such information but lack the necessary formal access approvals. \nCryptography can also be used to support random number generation and hash generation. \nCryptographic standards include FIPS-validated cryptography and/or NSA-approved \ncryptography.",
    further_discussion:
      "When CMMC requires cryptography, it is to protect the confidentiality of CUI. FIPS-validated \ncryptography means the cryptographic module has to have been tested and validated to \nmeet FIPS 140-1 or-2 requirements. Simply using an approved algorithm is not sufficient – \nthe module (software and/or hardware) used to implement the algorithm must be \nseparately validated under FIPS 140. Accordingly, FIPS-validated cryptography is required \nto meet CMMC practices that protect CUI when transmitted or stored outside the protected \n \n \nSC.L2-3.13.11 – CUI Encryption \nenvironment of the covered contractor information system (including wireless/remote \naccess). Encryption used for other purposes, such as within applications or devices within \nthe protected environment of the covered contractor information system, would not need to \nbe FIPS-validated. \nThis practice, SC.L2-3.13.11, complements AC.L2-3.1.19, MP.L2-3.8.6, SC.L2-3.13.8, and \nSC.L2-3.13.16 by specifying that FIPS-validated cryptography must be used.",
    fd_examples: {
      Example:
        "You are a system administrator responsible for deploying encryption on all devices that \ncontain CUI. You must ensure that the encryption you use on the devices is FIPS-validated \ncryptography [a]. An employee informs you of a need to carry a large volume of CUI offsite \nand asks for guidance on how to do so. You provide the user with disk encryption software \nthat you have verified via the NIST website that uses a CMVP-validated encryption module \n[a]. Once the encryption software is active, the user copies the CUI data onto the drive for \ntransport.",
    },
    fd_pac: [
      "Is cryptography implemented to protect the confidentiality of CUI at rest and in transit, \nthrough the configuration of systems and applications or through the use of encryption \ntools [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.13.11"],
  },
  {
    id: 99,
    level: 2,
    section: "3.13.12",
    section_name: "COLLABORATIVE DEVICE CONTROL ",
    brief_description:
      "Prohibit remote activation of collaborative computing devices and provide indication of \ndevices in use to users present at the device. \n",
    assessment_objectives: {
      a: "collaborative computing devices are identified;",
      b: "collaborative computing devices provide indication to users of devices in use; and",
      c: "remote activation of collaborative computing devices is prohibited.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \ncollaborative computing; access control policy and procedures; system security plan; system \ndesign documentation; system audit logs and records; system configuration settings and \nassociated documentation; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developer; personnel with responsibilities for managing \ncollaborative computing devices]",
    test: "[SELECT FROM: Mechanisms supporting or implementing management of remote activation \nof collaborative computing devices; mechanisms providing an indication of use of \ncollaborative computing devices]",
    discussion:
      "Collaborative computing devices include networked white boards, cameras, and \nmicrophones. Indication of use includes signals to users when collaborative computing \ndevices are activated. Dedicated video conferencing systems, which rely on one of the \nparticipants calling or connecting to the other party to activate the video conference, are \nexcluded.",
    further_discussion:
      "Notification that a device is in use can include an indicator light that turns on or a specific \ntext window that appears on screen. If a device does not have the means to alert a user when \nin use, the organization should provide manual means. Manual means can include, as \nnecessary: \n paper notification on entryways; and \n locking entryways when a collaborative computing device is in use. \nThis practice is not intended to include technologies that enable users to share the contents \nof their computer screens via the internet.",
    fd_examples: {
      Example:
        "A group of remote employees at your company routinely collaborate using cameras and \nmicrophones attached to their computers [a]. To prevent the misuse of these devices, you \ndisable the ability to turn on cameras or microphones remotely [c]. You ensure the machines \nalert users when the camera or microphone are in use with a light beside the camera and an \nonscreen notification [b]. Although remote activation is blocked, this enables users to see if \nthe devices are active.",
    },
    fd_pac: [
      "Are the collaborative computing devices configured to provide indication to users when \nin use (e.g., a light, text notification, or audio tone) or are users alerted before entering a \nspace (e.g., written notice posted outside the space) where they are in use [b]?",
      "Are the collaborative computing devices configured to prevent them from being turned \non without user interaction or consent [c]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.13.12"],
  },
  {
    id: 100,
    level: 2,
    section: "3.13.13",
    section_name: "MOBILE CODE ",
    brief_description: "Control and monitor the use of mobile code. \n",
    assessment_objectives: {
      a: "use of mobile code is controlled; and",
      b: "use of mobile code is monitored.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \nmobile code; mobile code usage restrictions, mobile code implementation policy and \nprocedures; system audit logs and records; system security plan; list of acceptable mobile \ncode and mobile code technologies; list of unacceptable mobile code and mobile \ntechnologies; authorization records; system monitoring records; system audit logs and \nrecords; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; personnel with responsibilities for managing mobile code]",
    test: "[SELECT FROM: Organizational process for controlling, authorizing, monitoring, and \nrestricting mobile code; mechanisms supporting or implementing the management of \nmobile code; mechanisms supporting or implementing the monitoring of mobile code]",
    discussion:
      "Mobile code technologies include Java, JavaScript, ActiveX, Postscript, PDF, Flash animations, \nand VBScript. Decisions regarding the use of mobile code in organizational systems are based \non the potential for the code to cause damage to the systems if used maliciously. Usage \nrestrictions and implementation guidance apply to the selection and use of mobile code \ninstalled on servers and mobile code downloaded and executed on individual workstations, \nnotebook computers, and devices (e.g., smart phones). Mobile code policy and procedures \naddress controlling or preventing the development, acquisition, or introduction of \nunacceptable mobile code in systems, including requiring mobile code to be digitally signed \nby a trusted source.",
    further_discussion:
      "Ensure mobile code is authorized to execute in company systems only in accordance with \npolicy and technical configuration, and that unauthorized mobile code is not. Monitor the use \nof mobile code through boundary devices (e.g., firewalls), audit logs, or security utilities (e.g., \nmobile device management, advanced endpoint protection) and implement remediation \nactivities as needed. \nThe first intent of this practice is to ensure the limits of mobile code usage and usage \nrestrictions are documented and enforced. This includes documenting all authorizations for \nthe use of mobile code and ensuring it is not used in other ways. Usage restrictions and \nimplementation guidance apply to the selection and use of mobile code installed on servers \nand mobile code downloaded and executed on individual workstations and devices to \ninclude all mobile devices and smart phones.  \nThe second intent is to monitor the use of mobile code and implement remediation steps if \nits use does not align with policy.",
    fd_examples: {
      Example:
        "Your company has decided to prohibit the use of Flash, ActiveX, and Java plug-ins for web \nbrowsers on all of its computers [a]. To enforce this policy you configure the computer \nbaseline configuration to disable and deny the execution of mobile code [a]. You implement \nan exception process to re-enable mobile code execution only for those users with a \nlegitimate business need [a]. \nOne department complains that a web application they need to perform their job no longer \nworks. You meet with them and verify that the web application uses ActiveX in the browser. \nYou submit a change request with the Change Review Board. Once the change is approved, \nyou reconfigure the department’s computers to allow the running of ActiveX in the browser. \nYou also configure the company firewall to alert you if ActiveX is used by any website but the \nallowed one [b]. You set a reminder for yourself to check in with the department at the end \nof the year to verify they still need that web application.",
    },
    fd_pac: [
      "Are there defined limits of mobile code usage and established usage restrictions, which \nspecifically authorize use of mobile code (e.g., Java, JavaScript, ActiveX, PDF, Flash, \nShockwave, Postscript, VBScript) within the information system [a]?74",
      "Is the use of mobile code documented, monitored, and managed (e.g., Java, JavaScript, \nActiveX, PDF, Flash, Shockwave, Postscript, VBScript) [b]?75",
    ],
    key_references: [""],
  },
  {
    id: 101,
    level: 2,
    section: "3.13.14",
    section_name: "VOICE OVER INTERNET PROTOCOL ",
    brief_description:
      "Control and monitor the use of Voice over Internet Protocol (VoIP) technologies. \n",
    assessment_objectives: {
      a: "use of Voice over Internet Protocol (VoIP) technologies is controlled; and",
      b: "use of Voice over Internet Protocol (VoIP) technologies is monitored.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \nVoIP; VoIP usage restrictions; VoIP implementation guidance; system security plan; system \ndesign documentation; system audit logs and records; system configuration settings and \nassociated documentation; system monitoring records; other relevant documents or \nrecords]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; personnel with responsibilities for managing VoIP]",
    test: "[SELECT FROM: Organizational process for authorizing, monitoring, and controlling VoIP; \nmechanisms supporting or implementing authorizing, monitoring, and controlling VoIP]",
    discussion:
      "VoIP has different requirements, features, functionality, availability, and service limitations \nwhen compared with the Plain Old Telephone Service (POTS) (i.e., the standard telephone \nservice). In contrast, other telephone services are based on high-speed, digital \ncommunications lines, such as Integrated Services Digital Network (ISDN) and Fiber \nDistributed Data Interface (FDDI). The main distinctions between POTS and non-POTS \nservices are speed and bandwidth. To address the threats associated with VoIP, usage \nrestrictions and implementation guidelines are based on the potential for the VoIP \ntechnology to cause damage to the system if it is used maliciously. Threats to VoIP are similar \nto those inherent with any Internet-based application. \nNIST SP 800-58 provides guidance on Voice Over IP Systems.",
    further_discussion:
      "Controlling VoIP technologies starts with establishing guidelines and enforcing the \nappropriate usage that is described in organizational policies. Monitoring should include the \nusers’ activity for anything other than what is permitted and authorized and detection of \ninsecure or unauthorized use of the VoIP technology. Security concerns for VoIP include \neavesdropping on calls and using ID spoofing to impersonate trusted individuals. \nSelecting a solution that can encrypt VoIP traffic is helpful in maintaining the confidentiality \nand integrity of the voice data.",
    fd_examples: {
      Example:
        "You are a system administrator responsible for the VoIP system. You configure VoIP for new \nusers after being notified that they have signed the Acceptable Use Policy for VoIP technology \n[a]. You verify that the VoIP solution is configured to use encryption and have enabled \nrequirements for passwords on voice mailboxes and on phone extension management. You \nrequire phone system administrators to log in using multifactor authentication when \nmanaging the system [a]. You add the VoIP software to the list of applications that are \npatched monthly as needed [a,b]. Finally, you configure the VoIP system to send logs to your \nlog aggregator so that they can be correlated with those from other systems and examined \nfor signs of suspicious activity [b].",
    },
    fd_pac: [
      "Are VoIP technologies (e.g., approved and managed products or solutions) that may or \nmay not be used in the system defined [a]?",
      "Is monitoring for unapproved VoIP technologies or unapproved use of the allowed VoIP \nsolutions employed [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.13.14"],
  },
  {
    id: 102,
    level: 2,
    section: "3.13.15",
    section_name: "COMMUNICATIONS AUTHENTICITY ",
    brief_description:
      "Protect the authenticity of communications sessions. \n",
    assessment_objectives: {
      a: "the authenticity of communications sessions is protected.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \nsession authenticity; system security plan; system design documentation; system \nconfiguration settings and associated documentation; system audit logs and records; other \nrelevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities]",
    test: "[SELECT FROM: Mechanisms supporting or implementing session authenticity]",
    discussion:
      "Authenticity protection includes protecting against man-in-the-middle attacks, session \nhijacking, and the insertion of false information into communications sessions. This \nrequirement addresses communications protection at the session versus packet level (e.g., \nsessions in service-oriented architectures providing web-based services) and establishes \ngrounds for confidence at both ends of communications sessions in ongoing identities of \nother parties and in the validity of information transmitted. \nNIST SP 800-77, NIST SP 800-95, and NIST SP 800-113 provide guidance on secure \ncommunications sessions.",
    further_discussion:
      "The intent of this practice is to ensure a trust relationship is established between both ends \nof a communication session. Each end can be assured that the other end is who it is supposed \nto be. This is often implemented using a mutual authentication handshake when the session \nis established, especially between devices. Session authenticity is usually provided by a \nsecurity protocol enforced for a communication session. Choosing and enforcing a protocol \nwill provide authenticity throughout a communications session.",
    fd_examples: {
      Example:
        "You are a system administrator responsible for ensuring that the two-factor user \nauthentication mechanism for the servers is configured correctly. You purchase and \nmaintain the digital certificate and replace it with a new one before the old one expires. You \nensure the TLS configuration settings on the web servers, VPN solution, and other \ncomponents that use TLS are correct, using secure settings that address risks against attacks \non the encrypted sessions [a].",
    },
    fd_pac: [
      "Is a communications protocol used that ensures the sending and receiving parties do not \nchange during a communications session [a]?",
      "Are controls in place to validate the identities and information transmitted to protect \nagainst man-in-the-middle attacks, session hijacking, and insertion of false information \ninto communications sessions [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.13.15"],
  },
  {
    id: 103,
    level: 2,
    section: "3.13.16",
    section_name: "DATA AT REST ",
    brief_description: "Protect the confidentiality of CUI at rest. \n",
    assessment_objectives: {
      a: "the confidentiality of CUI at rest is protected.",
    },
    examine:
      "[SELECT FROM: System and communications protection policy; procedures addressing \nprotection of information at rest; system security plan; system design documentation; list of \ninformation at rest requiring confidentiality protections; system configuration settings and \nassociated documentation; cryptographic mechanisms and associated configuration \ndocumentation; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; system developer]",
    test: "[SELECT FROM: Mechanisms supporting or implementing confidentiality protections for \ninformation at rest]",
    discussion:
      "Information at rest refers to the state of information when it is not in process or in transit \nand is located on storage devices as specific components of systems. The focus of protection \nat rest is not on the type of storage device or the frequency of access but rather the state of \nthe information. Organizations can use different mechanisms to achieve confidentiality \nprotections, including the use of cryptographic mechanisms and file share scanning. \nOrganizations may also use other controls including secure off-line storage in lieu of online \nstorage when adequate protection of information at rest cannot otherwise be achieved or \ncontinuous monitoring to identify malicious code at rest.",
    further_discussion:
      "CUI at rest means information that is not moving through the network; typically this means \ndata currently stored on hard drives, media, and mobile devices. Implement the necessary \nsecurity controls to protect the confidentiality of CUI at rest. Although an approved \nencryption method protects data stored at rest, there are other technical and physical \nsolutions. The methods chosen should depend on the environment and business needs. \nImplementing encryption for CUI is one approach to this practice, but it is not mandatory. \nPhysical security is often employed to restrict access to CUI, particularly when it resides on \nservers within a company’s offices. Other approaches for protecting CUI include system-\nrelated protections such as configurations and rule sets for firewalls, gateways, intrusion \ndetection/prevention systems, filtering routers, and authenticator content that eliminate \nattempts at exfiltration. You may also employ other security requirements including secure \noff-line storage. \nThis practice, SC.L2-3.13.16, requires confidentially be provided for CUI at rest and \ncomplements MP.L2-3.8.9, which requires confidentially of CUI at backup storage locations. \nThis practice, SC.L2-3.13.16, also leverages SC.L2-3.13.11, which specifies that the \nalgorithms used must be FIPS-validated.",
    fd_examples: {
      "Example 1":
        "Your company has a policy stating CUI must be protected at rest and you work to enforce \nthat policy. You research Full Disk Encryption (FDE) products that meet the FIPS encryption \nrequirement. After testing, you deploy the encryption to all computers to protect CUI at rest \n[a].",
      "Example 2":
        "You have used encryption to protect the CUI on most of the computers at your company, but \nyou have some devices that do not support encryption. You create a policy requiring these \ndevices to be signed out when needed, stay in possession of the signer when checked out, \nand to be signed back in and locked up in a secured closet when the user is done with the \ndevice [a]. At the end of the day each Friday, you audit the sign-out sheet and make sure all \ndevices are returned to the closet.",
    },
    fd_pac: [
      "Is the confidentiality of CUI at rest protected using encryption of storage devices and/or \nappropriate physical methods [a]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.13.16"],
  },
  {
    id: 104,
    level: 1,
    section: "3.14.1",
    section_name: "FLAW REMEDIATION ",
    brief_description:
      "Identify, report, and correct information and information system flaws in a timely manner. \n",
    assessment_objectives: {
      a: "the time within which to identify system flaws is specified;",
      b: "system flaws are identified within the specified time frame;",
      c: "the time within which to report system flaws is specified;",
      d: "system flaws are reported within the specified time frame;",
      e: "the time within which to correct system flaws is specified; and",
      f: "system flaws are corrected within the specified time frame.",
    },
    examine:
      "[SELECT FROM: System and information integrity policy; procedures addressing flaw \nremediation; procedures addressing configuration management; system security plan; list \nof flaws and vulnerabilities potentially affecting the system; list of recent security flaw \nremediation actions performed on the system (e.g., list of installed patches, service packs, \nhot fixes, and other software updates to correct system flaws); test results from the \ninstallation of software and firmware updates to correct system flaws; installation/change \ncontrol records for security-relevant software and firmware updates; other relevant \ndocuments or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; personnel installing, configuring, and maintaining the system; personnel \nwith responsibility for flaw remediation; personnel with configuration management \nresponsibility]",
    test: "[SELECT FROM: Organizational processes for identifying, reporting, and correcting system \nflaws; organizational process for installing software and firmware updates; mechanisms \nsupporting or implementing reporting, and correcting system flaws; mechanisms supporting \nor implementing testing software and firmware updates]",
    discussion:
      "Organizations identify systems that are affected by announced software and firmware flaws \nincluding potential vulnerabilities resulting from those flaws and report this information to \ndesignated personnel with information security responsibilities. Security-relevant updates \ninclude patches, service packs, hot fixes, and anti-virus signatures. Organizations address \nflaws discovered during security assessments, continuous monitoring, incident response \nactivities, and system error handling. Organizations can take advantage of available \nresources such as the Common Weakness Enumeration (CWE) database or Common \nVulnerabilities and Exposures (CVE) database in remediating flaws discovered in \norganizational systems. \nOrganization-defined time periods for updating security-relevant software and firmware \nmay vary based on a variety of factors including the criticality of the update (i.e., severity of \nthe vulnerability related to the discovered flaw). Some types of flaw remediation may require \nmore testing than other types of remediation. NIST SP 800-40 provides guidance on patch \nmanagement technologies.",
    further_discussion:
      "All software and firmware have potential flaws. Many vendors work to remedy those flaws \nby releasing vulnerability information and updates to their software and firmware. \nContractors must have a process to review relevant vendor notifications and updates about \nproblems or weaknesses. After reviewing the information, the contractor must implement a \npatch management process that allows for software and firmware flaws to be fixed without \nadversely affecting the system functionality. Contractors must define the time frames within \nwhich flaws are identified, reported, and corrected for all systems. Contractors should \nconsider purchasing support from their vendors to ensure timely access to updates.",
    fd_examples: {
      Example:
        "You know that software vendors typically release patches, service packs, hot fixes, etc. and \nwant to make sure your software is up to date. You develop a policy that requires checking \nvendor websites for flaw notifications every week [a]. The policy further requires that those \nflaws be assessed for severity and patched on end-user computers once each week and \nservers once each month [c,e]. Consistent with that policy, you configure the system to check \nfor updates weekly or daily depending on the criticality of the software [b,e]. Your team \nreviews available updates and implements the applicable ones according to the defined \nschedule [f].",
    },
    fd_pac: [
      "Is the time frame (e.g., a set number of days) within which system flaw identification \nactivities (e.g., vulnerability scans, configuration scans, manual review) must be \nperformed defined and documented [a]?",
      "Are system flaws (e.g., vulnerabilities, misconfigurations) identified in accordance with \nthe specified time frame [b]?",
      "Is the time frame (e.g., a set number of days dependent on the assessed severity of a flaw) \nwithin which system flaws must be corrected defined and documented [e]?",
      "Are system flaws (e.g., applied security patches, made configuration changes, or \nimplemented workarounds or mitigations) corrected in accordance with the specified \ntime frame [f]?",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.xii",
      "NIST SP 800-171 Rev 2 3.14.1",
    ],
  },
  {
    id: 105,
    level: 1,
    section: "3.14.2",
    section_name: "MALICIOUS CODE PROTECTION ",
    brief_description:
      "Provide protection from malicious code at appropriate locations within organizational \ninformation systems. \n",
    assessment_objectives: {
      a: "designated locations for malicious code protection are identified; and",
      b: "protection from malicious code at designated locations is provided.",
    },
    examine:
      "[SELECT FROM: System and information integrity policy; configuration management policy \nand procedures; procedures addressing malicious code protection; records of malicious \ncode protection updates; malicious code protection mechanisms; system security plan; \nsystem configuration settings and associated documentation; record of actions initiated by \nmalicious code protection mechanisms in response to malicious code detection; scan results \nfrom malicious code protection mechanisms; system design documentation; system audit \nlogs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; personnel installing, configuring, and maintaining the system; personnel \nwith responsibility for malicious code protection; personnel with configuration management \nresponsibility]",
    test: "[SELECT FROM: Organizational processes for employing, updating, and configuring \nmalicious code protection mechanisms; organizational process for addressing false positives \nand resulting potential impact; mechanisms supporting or implementing employing, \nupdating, and configuring malicious code protection mechanisms; mechanisms supporting \nor implementing malicious code scanning and subsequent actions]",
    discussion:
      "Designated locations include system entry and exit points which may include firewalls, \nremote access servers, workstations, electronic mail servers, web servers, proxy servers, \nnotebook computers, and mobile devices. Malicious code includes viruses, worms, Trojan \nhorses, and spyware. Malicious code can be encoded in various formats (e.g., UUENCODE, \nUnicode), contained within compressed or hidden files, or hidden in files using techniques \nsuch as steganography. Malicious code can be inserted into systems in a variety of ways \nincluding web accesses, electronic mail, electronic mail attachments, and portable storage \ndevices. Malicious code insertions occur through the exploitation of system vulnerabilities. \nMalicious code protection mechanisms include anti-virus signature definitions and \nreputation-based technologies. A variety of technologies and methods exist to limit or \neliminate the effects of malicious code. Pervasive configuration management and \ncomprehensive software integrity controls may be effective in preventing execution of \nunauthorized code. In addition to commercial off-the-shelf software, malicious code may also \nbe present in custom-built software. This could include logic bombs, back doors, and other \ntypes of cyber-attacks that could affect organizational missions/business functions. \nTraditional malicious code protection mechanisms cannot always detect such code. In these \nsituations, organizations rely instead on other safeguards including secure coding practices, \nconfiguration management and control, trusted procurement processes, and monitoring \npractices to help ensure that software does not perform functions other than the functions \nintended. NIST SP 800-83 provides guidance on malware incident prevention.",
    further_discussion:
      "A designated location may be a network device such as a firewall or an end user’s computer.  \nMalicious code, which can be delivered by a range of means (e.g., email, removable media, or \nwebsites), includes the following: \n virus – program designed to damage, steal information, change data, send email, show \nmessages, or any combination of these things; \n spyware – program designed to gather information about a person’s activity in secret \nwhen they click on a link, usually installed without the person knowing ;  \n trojan horse – type of malware made to look like legitimate software and used by cyber \ncriminals to get access to a company’s systems; and \n ransomware – type of malware that threatens to publish the contractor’s data or \nperpetually block access to it unless a ransom is paid. \nUse anti-malware tools to stop or lessen the impact of malicious code.",
    fd_examples: {
      Example:
        "You are buying a new computer and want to protect your company’s information from \nviruses, spyware, etc. You buy and install anti-malware software [a,b].",
    },
    fd_pac: [
      "Are system components (e.g., workstations, servers, email gateways, mobile devices) for \nwhich malicious code protection must be provided identified and documented [a]?",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.xiii",
      "NIST SP 800-171 Rev 2 3.14.2",
    ],
  },
  {
    id: 106,
    level: 1,
    section: "3.14.4",
    section_name: "UPDATE MALICIOUS CODE PROTECTION ",
    brief_description:
      "Update malicious code protection mechanisms when new releases are available. \n",
    assessment_objectives: {
      a: "malicious code protection mechanisms are updated when new releases are available.",
    },
    examine:
      "[SELECT FROM: System and information integrity policy; configuration management policy \nand procedures; procedures addressing malicious code protection; malicious code \nprotection mechanisms; records of malicious code protection updates; system security plan; \nsystem design documentation; system configuration settings and associated documentation; \nscan results from malicious code protection mechanisms; record of actions initiated by \nmalicious code protection mechanisms in response to malicious code detection; system audit \nlogs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; personnel installing, configuring, and maintaining the system; personnel \nwith responsibility for malicious code protection; personnel with configuration management \nresponsibility]",
    test: "[SELECT FROM: Organizational processes for employing, updating, and configuring \nmalicious code protection mechanisms; organizational process for addressing false positives \nand resulting potential impact; mechanisms supporting or implementing malicious code \nprotection mechanisms (including updates and configurations); mechanisms supporting or \nimplementing malicious code scanning and subsequent actions]",
    discussion:
      "Malicious code protection mechanisms include anti-virus signature definitions and \nreputation-based technologies. A variety of technologies and methods exist to limit or \neliminate the effects of malicious code. Pervasive configuration management and \ncomprehensive software integrity controls may be effective in preventing execution of \nunauthorized code. In addition to commercial off-the-shelf software, malicious code may also \nbe present in custom-built software. This could include logic bombs, back doors, and other \ntypes of cyber-attacks that could affect organizational missions/business functions. \nTraditional malicious code protection mechanisms cannot always detect such code. In these \nsituations, organizations rely instead on other safeguards including secure coding practices, \nconfiguration management and control, trusted procurement processes, and monitoring \npractices to help ensure that software does not perform functions other.",
    further_discussion:
      "Malware changes on an hourly or daily basis, and it is important to update detection and \nprotection mechanisms frequently to maintain the effectiveness of the protection.",
    fd_examples: {
      Example:
        "You have installed anti-malware software to protect a computer from malicious code. \nKnowing that malware evolves rapidly, you configure the software to automatically check \nfor malware definition updates every day and update as needed [a].",
    },
    fd_pac: [
      "Is there a defined frequency by which malicious code protection mechanisms must be \nupdated (e.g., frequency of automatic updates or manual processes) [a]?",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.xiv",
      "NIST SP 800-171 Rev 2 3.14.4 & File Scanning",
    ],
  },
  {
    id: 107,
    level: 1,
    section: "3.14.5",
    section_name: "SYSTEM & FILE SCANNING ",
    brief_description:
      "Perform periodic scans of the information system and real-time scans of files from external \nsources as files are downloaded, opened, or executed. \n",
    assessment_objectives: {
      a: "the frequency for malicious code scans is defined;",
      b: "malicious code scans are performed with the defined frequency; and",
      c: "real-time malicious code scans of files from external sources as files are downloaded, \nopened, or executed are performed.",
    },
    examine:
      "[SELECT FROM: System and information integrity policy; configuration management policy \nand procedures; procedures addressing malicious code protection; malicious code \nprotection mechanisms; records of malicious code protection updates; system security plan; \nsystem design documentation; system configuration settings and associated documentation; \nscan results from malicious code protection mechanisms; record of actions initiated by \nmalicious code protection mechanisms in response to malicious code detection; system audit \nlogs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; personnel installing, configuring, and maintaining the system; personnel \nwith responsibility for malicious code protection; personnel with configuration management \nresponsibility]",
    test: "[SELECT FROM: Organizational processes for employing, updating, and configuring \nmalicious code protection mechanisms; organizational process for addressing false positives \nand resulting potential impact; mechanisms supporting or implementing malicious code \nprotection mechanisms (including updates and configurations); mechanisms supporting or \nimplementing malicious code scanning and subsequent actions]",
    discussion:
      "Periodic scans of organizational systems and real-time scans of files from external sources \ncan detect malicious code. Malicious code can be encoded in various formats (e.g., \nUUENCODE, Unicode), contained within compressed or hidden files, or hidden in files using \ntechniques such as steganography. Malicious code can be inserted into systems in a variety & File Scanning \nof ways including web accesses, electronic mail, electronic mail attachments, and portable \nstorage devices. Malicious code insertions occur through the exploitation of system \nvulnerabilities.",
    further_discussion:
      "Use anti-malware software to scan for and identify viruses in your computer systems and \ndetermine how often scans are conducted. Real-time scans look at the system whenever new \nfiles are downloaded, opened, and saved. Periodic scans check previously saved files against \nupdated malware information.",
    fd_examples: {
      Example:
        "You work with your company’s email provider to enable enhanced protections that will scan \nall attachments to identify and quarantine those that may be harmful prior to a user opening \nthem [c]. In addition, you configure antivirus software on each computer to scan for \nmalicious code every day [a,b]. The software also scans files that are downloaded or copied \nfrom removable media such as USB drives. It quarantines any suspicious files and notifies \nthe security team [c].",
    },
    fd_pac: [
      "Are files from media (e.g., USB drives, CD-ROM) included in the definition of external \nsources and are they being scanned [c]?",
    ],
    key_references: [
      "FAR Clause 52.204-21 b.1.xv",
      "NIST SP 800-171 Rev 2 3.14.5 & Advisories",
    ],
  },
  {
    id: 108,
    level: 2,
    section: "3.14.3",
    section_name: "SECURITY ALERTS & ADVISORIES ",
    brief_description:
      "Monitor system security alerts and advisories and take action in response. \n",
    assessment_objectives: {
      a: "response actions to system security alerts and advisories are identified;",
      b: "system security alerts and advisories are monitored; and",
      c: "actions in response to system security alerts and advisories are taken.",
    },
    examine:
      "[SELECT FROM: System and information integrity policy; procedures addressing security \nalerts, advisories, and directives; system security plan; records of security alerts and \nadvisories; other relevant documents or records]",
    interview:
      "[SELECT FROM: Personnel with security alert and advisory responsibilities; personnel \nimplementing, operating, maintaining, and using the system; personnel, organizational \nelements, and external organizations to whom alerts, advisories, and directives are to be \ndisseminated; system or network administrators; personnel with information security \nresponsibilities]",
    test: "[SELECT FROM: Organizational processes for defining, receiving, generating, disseminating, \nand complying with security alerts, advisories, and directives; mechanisms supporting or \nimplementing definition, receipt, generation, and dissemination of security alerts, \nadvisories, and directives; mechanisms supporting or implementing security directives]",
    discussion:
      "There are many publicly available sources of system security alerts and advisories. The \nUnited States Computer Emergency Readiness Team (US-CERT) generates security alerts \nand advisories to maintain situational awareness across the federal government and in \nnonfederal organizations. Software vendors, subscription services, and relevant industry \ninformation sharing and analysis centers (ISACs) may also provide security alerts and \nadvisories. Examples of response actions include notifying relevant external organizations, & Advisories \nfor example, external mission/business partners, supply chain partners, external service \nproviders, and peer or supporting organizations. \nNIST SP 800-161 provides guidance on supply chain risk management.",
    further_discussion:
      "Solicit and receive security alerts, advisories, and directives from reputable external \norganizations. Identify sources relevant to the industry and technology used by your \ncompany. Methods to receive alerts and advisories may include:  \n signing up for email distributions; \n subscribing to RSS feeds; and \n attending meetings. \nReview alerts and advisories for applicability as they are received. The frequency of the \nreviews should be based on the frequency of the alerts and advisories to ensure you have the \nmost up-to-date information. \nExternal alerts and advisories may prompt you to generate internal security alerts, \nadvisories, or directives, and share these with all personnel with a need-to-know. The \nindividuals should assess the risk related to a given alert and act to respond as appropriate. \nSometimes it may require a configuration update. Other times, the information may also \nrequire adjusting system architecture in order to thwart a threat described in an advisory.",
    fd_examples: {
      Example:
        "You monitor security advisories each week. You review the alert emails and online \nsubscription service alerts to determine which ones apply [b]. You create a list of the \napplicable alerts and research what steps you need to take to address them. Next, you \ngenerate a plan that you review with your change management group so that the work can \nbe scheduled [c].",
    },
    fd_pac: [
      "Are the responses to system security alerts and advisories identified in relation to the \nassessed severity of potential flaws (e.g., communicating with responsible personnel, \ninitiating vulnerability scans, initiating system flaw remediation activities) [a]?",
      "Are system security alerts and advisories addressed (e.g., assessing potential severity or \nlikelihood, communicating with responsible personnel, initiating vulnerability scans, \ninitiating system flaw remediation activities) [a,c]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.14.3"],
  },
  {
    id: 109,
    level: 2,
    section: "3.14.6",
    section_name: "MONITOR COMMUNICATIONS FOR ATTACKS ",
    brief_description:
      "Monitor organizational systems, including inbound and outbound communications traffic, to \ndetect attacks and indicators of potential attacks. \n",
    assessment_objectives: {
      a: "the system is monitored to detect attacks and indicators of potential attacks;",
      b: "inbound communications traffic is monitored to detect attacks and indicators of \npotential attacks; and",
      c: "outbound communications traffic is monitored to detect attacks and indicators of \npotential attacks.",
    },
    examine:
      "[SELECT FROM: System and information integrity policy; procedures addressing system \nmonitoring tools and techniques; continuous monitoring strategy; system and information \nintegrity policy; procedures addressing system monitoring tools and techniques; facility \ndiagram or layout; system security plan; system monitoring tools and techniques \ndocumentation; system design documentation; locations within system where monitoring \ndevices are deployed; system protocols; system configuration settings and associated \ndocumentation; system audit logs and records; other relevant documents or records]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; personnel installing, configuring, and maintaining the system; personnel \nwith responsibility monitoring the system; personnel with responsibility for the intrusion \ndetection system]",
    test: "[SELECT FROM: Organizational processes for system monitoring; mechanisms supporting or \nimplementing intrusion detection capability and system monitoring; mechanisms \nsupporting or implementing system monitoring capability; organizational processes for \nintrusion detection and system monitoring; mechanisms supporting or implementing the \nmonitoring of inbound and outbound communications traffic]",
    discussion:
      "System monitoring includes external and internal monitoring. External monitoring includes \nthe observation of events occurring at the system boundary (i.e., part of perimeter defense \nand boundary protection). Internal monitoring includes the observation of events occurring \nwithin the system. Organizations can monitor systems, for example, by observing audit \nrecord activities in real time or by observing other system aspects such as access patterns, \ncharacteristics of access, and other actions. The monitoring objectives may guide \ndetermination of the events. System monitoring capability is achieved through a variety of \ntools and techniques (e.g., intrusion detection systems, intrusion prevention systems, \nmalicious code protection software, scanning tools, audit record monitoring software, \nnetwork monitoring software). Strategic locations for monitoring devices include selected \nperimeter locations and near server farms supporting critical applications, with such devices \nbeing employed at managed system interfaces. The granularity of monitoring information \ncollected is based on organizational monitoring objectives and the capability of systems to \nsupport such objectives. \nSystem monitoring is an integral part of continuous monitoring and incident response \nprograms. Output from system monitoring serves as input to continuous monitoring and \nincident response programs. A network connection is any connection with a device that \ncommunicates through a network (e.g., local area network, Internet). A remote connection \nis any connection with a device communicating through an external network (e.g., the \nInternet). Local, network, and remote connections can be either wired or wireless. \nUnusual or unauthorized activities or conditions related to inbound/outbound \ncommunications traffic include internal traffic that indicates the presence of malicious code \nin systems or propagating among system components, the unauthorized exporting of \ninformation, or signaling to external systems. Evidence of malicious code is used to identify \npotentially compromised systems or system components. System monitoring requirements, \nincluding the need for specific types of system monitoring, may be referenced in other \nrequirements. \nNIST SP 800-94 provides guidance on intrusion detection and prevention systems.",
    further_discussion:
      "Think of indicators of attack as a set of footprints an adversary leaves during an attack. \nIndicators of attack provide information on the steps the adversary followed and its intent. \nIndicators of attacks on organizational systems may include: \n internal traffic that indicates the presence of malicious code; \n anomalous activity detected during non-business hours; \n unauthorized data leaving the organization; and \n communicating to external information systems. \nTo detect attacks and indicators of attacks, deploy monitoring devices or agents. Place these \nsensors at strategic points within the systems and networks to collect essential information. \nStrategic points include internal and external system boundaries. Monitor both inbound \ntraffic and outbound traffic as well as actions on hosts. \nThis practice, SI.L2-3.14.6, provides details for the communications of organizational \nsystems. SI.L2-3.14.6 supports the practice AU.L2-3.3.1, which involves creating and \nretaining records for monitoring, analysis, and investigations.",
    fd_examples: {
      Example:
        "It is your job to look for known indicators of attack or anomalous activity within your \nsystems and communications traffic [a,b,c]. Because these indicators can show up in a variety \nof places on your network, you have created a checklist of places to check each week. These \ninclude the office firewall logs, the audit logs of the file server where CUI is stored, and the \nconnection log for your VPN gateway [b]. \nYou conduct additional reviews when you find an indicator, or something that does not \nperform as it should [a].",
    },
    fd_pac: [
      "Are details provided for the methodology of determining attacks and indicators of attack \n[a]?",
      "Are monitoring devices deployed within the information system to collect information \nthat may indicate an attack [a]?",
      "Are communications traffic flows understood and is there a deployed capability to review \nthat traffic [b,c]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.14.6"],
  },
  {
    id: 110,
    level: 2,
    section: "3.14.7",
    section_name: "IDENTIFY UNAUTHORIZED USE ",
    brief_description:
      "Identify unauthorized use of organizational systems. \n",
    assessment_objectives: {
      a: "authorized use of the system is defined; and",
      b: "unauthorized use of the system is identified.",
    },
    examine:
      "[SELECT FROM: Continuous monitoring strategy; system and information integrity policy; \nprocedures addressing system monitoring tools and techniques; facility diagram/layout; \nsystem security plan; system design documentation; system monitoring tools and \ntechniques documentation; locations within system where monitoring devices are deployed; \nsystem configuration settings and associated documentation; other relevant documents or \nrecords]",
    interview:
      "[SELECT FROM: System or network administrators; personnel with information security \nresponsibilities; personnel installing, configuring, and maintaining the system; personnel \nwith responsibility for monitoring the system]",
    test: "[SELECT FROM: Organizational processes for system monitoring; mechanisms supporting or \nimplementing system monitoring capability]",
    discussion:
      "System monitoring includes external and internal monitoring. System monitoring can detect \nunauthorized use of organizational systems. System monitoring is an integral part of \ncontinuous monitoring and incident response programs. Monitoring is achieved through a \nvariety of tools and techniques (e.g., intrusion detection systems, intrusion prevention \nsystems, malicious code protection software, scanning tools, audit record monitoring \nsoftware, network monitoring software). Output from system monitoring serves as input to \ncontinuous monitoring and incident response programs. \nUnusual/unauthorized activities or conditions related to inbound and outbound \ncommunications traffic include internal traffic that indicates the presence of malicious code \nin systems or propagating among system components, the unauthorized exporting of \ninformation, or signaling to external systems. Evidence of malicious code is used to identify \npotentially compromised systems or system components. System monitoring requirements, \nincluding the need for specific types of system monitoring, may be referenced in other \nrequirements. \nNIST SP 800-94 provides guidance on intrusion detection and prevention systems.",
    further_discussion:
      "Define authorized use of your systems. Create an acceptable use policy to establish the \nbaseline for how users access devices, internal network services, and the internet. Define \nauthorized use by specific roles such as: user, administrator, and technician. After authorized \nuse is defined, identify unauthorized use of systems. \nMonitor systems by observing audit activities from the system logs. This can be \naccomplished in real time using automated solutions or by manual means. To identify \nunauthorized use, leverage existing tools and techniques, such as: \n intrusion detection systems; \n intrusion prevention systems; \n malicious code protection software; \n scanning tools; \n audit record monitoring software; and \n network monitoring software. \nThis practice, SI.L2-3.14.7, which deals with identifying unauthorized use of organizational \nsystems, is related to practices: AC.L1-3.1.1, AU.L2-3.3.1, IA.L1-3.5.1, and IA.L1-3.5.2. All of \nthese practices help create the building blocks that support SI.L2-3.14.7.",
    fd_examples: {
      "Example 1":
        "You are in charge of IT operations. You need to ensure that everyone using an organizational \nsystem is authorized to do so and conforms to the written authorized use policy. To do this, \nyou deploy an application that monitors user activity and records the information for later \nanalysis. You review the data from this application for signs of activity that does not conform \nto the acceptable use policy [a,b].",
      "Example 2":
        "You are alerted through your Intrusion Detection System (IDS) that one of your users is \nconnecting to a server that is from a high-risk domain (based on your commercial domain \nreputation service). You investigate and determine that it’s not the user, but instead an \nunauthorized connection attempt [b]. You add the domain to your list of blocked domains \nto prevent connections in the future.",
    },
    fd_pac: [
      "Is authorized use of systems defined (e.g., data types permitted for storage or processing, \npersonnel authorized to access, times or days of permitted use, permitted software) [a]?",
      "Is unauthorized use of systems defined (e.g., not authorized to use systems for bitcoin \nmining, not authorized for pornographic content, not authorized to access gambling \ngames/content) [b]?",
    ],
    key_references: ["NIST SP 800-171 Rev 2 3.14.7"],
  },
];
