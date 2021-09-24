import 'package:flutter/material.dart';

class RaisedButtonFlat extends StatelessWidget {
  final String? text;

  const RaisedButtonFlat({Key? key, this.text}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
        splashColor: const Color(0x11FFFFFF),
        highlightColor: const Color(0x11FFFFFF),
        borderRadius: const BorderRadius.all(Radius.circular(100)),
        onTap: () {},
        child: Container(
          alignment: Alignment.center,
          height: 40,
          width: 120,
          decoration: const BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(100))),
          child: Text(text ?? 'Raised Button',
              style: const TextStyle(fontSize: 20, color: Color(0xFF0256FA))),
        ));
  }
}
