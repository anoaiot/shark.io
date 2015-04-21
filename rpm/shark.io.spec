%{?nodejs_find_provides_and_requires}

Summary:Javascript Client for ignsdk IoT
Name:sharkio
Version:0.1
Release:7
License:BSD
Group:System Environment/Base
URL:http://igos-nusantara.or.id
Source0:http://github.com/anak10thn/ignsdk-qt/archive/master.zip
BuildRoot:%{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
Requires:ignsdk-iot
Requires:nodejs
Requires:nodejs-faye-websocket
BuildRequires: nodejs-devel
BuildArch:  noarch
ExclusiveArch: %{nodejs_arches} noarch

%description
Javascript Client for ignsdk IoT

%prep
%setup -q -n shark.io-master

%install
mkdir -p %{buildroot}%{nodejs_sitelib}/shark.io
cp -rf index.js package.json lib.js LICENSE README.md %{buildroot}%{nodejs_sitelib}/shark.io
cp -rf examples/ %{buildroot}%{nodejs_sitelib}/shark.io

%clean
rm -rf $RPM_BUILD_ROOT

%files
%defattr(-,root,root,-)
%{nodejs_sitelib}/shark.io

%changelog
* Tue Apr 21 2015 ibnu yahya <anak10thn@gmail.com>
- Bump version to 0.1.7
